import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Download, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Link from "next/link";

type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  uploadedAt: string;
  url?: string;
  file?: File;
  uploading?: boolean;
  progress?: number;
  serverUrl?: string;
};

type Notice = {
  id: string;
  text: string;
  createdAt: string;
  processing?: boolean;
  serverId?: string;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const sampleFiles: UploadedFile[] = [
  {
    id: "f_demo_001",
    filename: "Syllabus_Sem1.pdf",
    size: 234_123,
    uploadedAt: "2025-09-10T10:15:00.000Z",
    url: "/mock-files/Syllabus_Sem1.pdf",
    uploading: false,
    progress: 100,
  },
  {
    id: "f_demo_002",
    filename: "Campus_Map.pptx",
    size: 1_240_982,
    uploadedAt: "2025-09-09T08:05:00.000Z",
    url: "/mock-files/Campus_Map.pptx",
    uploading: false,
    progress: 100,
  },
];

function getExt(name: string) {
  return name?.split(".")?.pop()?.toLowerCase() ?? "";
}

function FileTypeIcon({ ext }: { ext: string }) {
  if (ext === "pdf") {
    return (
      <svg width="28" height="34" viewBox="0 0 24 30" fill="none">
        <rect width="24" height="30" rx="3" fill="currentColor" />
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="white"
        >
          PDF
        </text>
      </svg>
    );
  }
  if (ext === "ppt" || ext === "pptx") {
    return (
      <svg width="28" height="34" viewBox="0 0 24 30" fill="none">
        <rect width="24" height="30" rx="3" fill="currentColor" />
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="white"
        >
          PPT
        </text>
      </svg>
    );
  }
  return (
    <svg width="28" height="34" viewBox="0 0 24 30" fill="none">
      <rect width="24" height="30" rx="3" fill="currentColor" />
      <path d="M6 8h12v2H6zM6 12h12v2H6z" fill="white" />
    </svg>
  );
}

function fileColorClasses(ext: string) {
  if (ext === "pdf") return "bg-red-600 text-white";
  if (ext === "ppt" || ext === "pptx") return "bg-amber-600 text-white";
  return "bg-neutral-600 text-white";
}

export default function Uploads({
  initialFiles = [],
  onFilesChange,
  initialNotices = [],
  onNoticesChange,
}: {
  initialFiles?: UploadedFile[];
  onFilesChange?: (files: UploadedFile[]) => void;
  initialNotices?: Notice[];
  onNoticesChange?: (notices: Notice[]) => void;
}) {
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(initialFiles);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [noticeInput, setNoticeInput] = useState("");
  const { user } = useUser();
  const [sendingNoticeIds, setSendingNoticeIds] = useState<
    Record<string, boolean>
  >({});
  const getFiles = async () => {
    try {
      const { data } = await api.get("api/pdf/list", {
        headers: {
          email: user?.emailAddresses[0]?.emailAddress || "",
        },
      });
      if (data.files === uploadedFiles) {
        return;
      }
      toast.success("Files Fetched!!");
      setUploadedFiles(data.files || []);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching files");
    }
  };
  useEffect(() => {
    getFiles();
  }, []);
  const xhrMap = useRef<Record<string, XMLHttpRequest | null>>({});

  const handleFileUpload = useCallback(
    (files: FileList | File[] | null) => {
      if (!files || files.length === 0) return;
      const fileArray = Array.isArray(files) ? files : Array.from(files);
      const newFiles: UploadedFile[] = fileArray.map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        filename: f.name,
        size: f.size,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(f),
        file: f,
        uploading: true,
        progress: 0,
      }));

      setUploadedFiles((prev) => {
        const merged = [...newFiles, ...prev];
        onFilesChange?.(merged);
        return merged;
      });

      setTimeout(() => {
        newFiles.forEach((nf) => startUpload(nf));
      }, 50);
    },
    [onFilesChange]
  );

  const startUpload = useCallback(
    async (fileObj: UploadedFile) => {
      if (!fileObj.file) return;
      const id = fileObj.id;
      const form = new FormData();
      form.append("pdf", fileObj.file, fileObj.filename);
      setUploadedFiles((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, uploading: true, progress: 0 } : p
        )
      );
      try {
        const response = await api.post("/api/pdf/upload", form, {
          headers: {
            email: user?.emailAddresses[0]?.emailAddress || "",
          },
          onUploadProgress: (progressEvent: any) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadedFiles((prev) =>
              prev.map((p) => (p.id === id ? { ...p, progress: percent } : p))
            );
          },
        });
        let serverUrl: string | undefined;
        try {
          serverUrl =
            response.data.url ??
            response.data.fileUrl ??
            response.data.publicUrl;
        } catch {}
        setUploadedFiles((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  uploading: false,
                  progress: 100,
                  serverUrl: serverUrl ?? p.url,
                  url: serverUrl ?? p.url,
                  file: undefined,
                }
              : p
          )
        );
        onFilesChange?.(uploadedFiles.map((f) => f));
        getFiles();
      } catch (error) {
        console.log(error);
        setUploadedFiles((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, uploading: false, progress: 0 } : p
          )
        );
      }
    },
    [onFilesChange, uploadedFiles]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const xhr = xhrMap.current[id];
      if (xhr) {
        try {
          xhr.abort();
        } catch {}
        xhrMap.current[id] = null;
      }

      setUploadedFiles((prev) => {
        const toRemove = prev.find((p) => p.id === id);
        if (toRemove?.url && toRemove?.file) {
          try {
            URL.revokeObjectURL(toRemove.url);
          } catch {}
        }
        const next = prev.filter((p) => p.id !== id);
        onFilesChange?.(next);
        return next;
      });
    },
    [onFilesChange]
  );

  const handleAddNotice = useCallback(async () => {
    const text = noticeInput.trim();
    if (!text) return;
    const id = `${Date.now()}-notice-${Math.random().toString(36).slice(2, 9)}`;
    const newNotice: Notice = {
      id,
      text,
      createdAt: new Date().toISOString(),
      processing: true,
    };

    setNotices((prev) => {
      const next = [newNotice, ...prev];
      onNoticesChange?.(next);
      return next;
    });
    setNoticeInput("");
    setSendingNoticeIds((s) => ({ ...s, [id]: true }));

    try {
      const resp = await api.post(
        "/api/notices/create",
        { text },
        {
          headers: {
            apikey:
              "25bb2097326ca2c3934e3849f275423e5e91dc2cbb7f1ea80061a9d9f7e28a75",
          },
        }
      );

      const serverId = resp?.data?.id ?? resp?.data?.noticeId;

      setNotices((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, processing: false, serverId: serverId ?? n.serverId }
            : n
        )
      );
      onNoticesChange?.(notices.map((n) => n));
    } catch (err) {
      // mark as not processing and keep text so user can retry or delete
      setNotices((prev) =>
        prev.map((n) => (n.id === id ? { ...n, processing: false } : n))
      );
    } finally {
      setSendingNoticeIds((s) => {
        const copy = { ...s };
        delete copy[id];
        return copy;
      });
    }
  }, [noticeInput, onNoticesChange, notices]);

  const handleDeleteNotice = useCallback(
    (id: string) => {
      setNotices((prev) => {
        const next = prev.filter((n) => n.id !== id);
        onNoticesChange?.(next);
        return next;
      });
    },
    [onNoticesChange]
  );

  const noFiles = uploadedFiles.length === 0;

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
        <FileUpload
          onChange={(ev: unknown) => {
            if (Array.isArray(ev) && ev.length && ev[0] instanceof File) {
              handleFileUpload(ev as File[]);
            } else if (ev instanceof FileList) {
              handleFileUpload(ev as FileList);
            } else if ((ev as any)?.target?.files) {
              handleFileUpload((ev as any).target.files as FileList);
            } else {
              console.log("Unknown FileUpload value:", ev);
            }
          }}
        />
        <p className="mt-3 text-xs text-muted-foreground">Allowed: .pdf</p>
      </div>

      <div className="max-w-4xl mx-auto mt-4">
        <h3 className="text-lg font-semibold">Uploaded files</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Files you have uploaded (click download to preview or remove to
          delete).
        </p>

        {noFiles ? (
          <Card className="p-4">
            <CardContent>
              <div className="text-sm text-muted-foreground">
                No files uploaded yet.
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((f) => {
              const ext = getExt(f.filename);
              const colorClass = fileColorClasses(ext);
              const displayUrl = f.serverUrl ?? f.url;
              return (
                <div
                  key={f.id}
                  className="p-3 border rounded-md bg-card relative flex flex-col h-full"
                >
                  <div
                    className={`absolute -top-2 -left-2 rounded-tr-md rounded-bl-md px-2 py-0.5 text-xs font-semibold ${colorClass}`}
                    title={ext || "file"}
                  >
                    .{ext || "file"}
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-md ${colorClass}`}
                      aria-hidden
                    >
                      <FileTypeIcon ext={ext} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="break-words max-w-full">
                          <div className="font-medium truncate">
                            {f.filename}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {formatBytes(f.size)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {ext ? `.${ext}` : "file"}
                        </span>
                      </div>
                      {f.uploading ? (
                        <div className="mt-3">
                          <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-teal-400"
                              style={{ width: `${f.progress ?? 0}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {f.progress ?? 0}% complete
                          </div>
                        </div>
                      ) : (
                        f.url && (
                          <div className="mt-3">
                            <div className="text-xs text-muted-foreground">
                              Stored on server
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-2 border-t border-transparent">
                    {f?.url ? (
                      <Link
                        href={f?.url}
                        target="_blank"
                        rel="noreferrer"
                        download={f.url}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:underline"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </Link>
                    ) : (
                      <></>
                    )}

                    {/* <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(f.id)}
                      className="text-destructive ml-auto"
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Delete</span>
                    </Button> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-6">
        <h3 className="text-lg font-semibold">Text notices / plain messages</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Short notices (e.g. &quot;Reminder: Bring your Hall tickets&quot;).
        </p>

        <Card className="p-4">
          <CardContent>
            <div className="space-y-3">
              <label className="text-sm font-medium">Notice text</label>
              <textarea
                value={noticeInput}
                onChange={(e) => setNoticeInput(e.target.value)}
                rows={3}
                className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                placeholder="Type a notice, e.g. 'School is closed tomorrow'"
              />

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAddNotice}
                  disabled={noticeInput.trim().length === 0}
                >
                  Send notice
                </Button>
                <div className="text-sm text-muted-foreground ml-auto">
                  {noticeInput.length} chars
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Saved notices</h4>

          {notices.length === 0 ? (
            <Card className="p-4">
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  No notices yet.
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="p-3 border rounded-md bg-card flex flex-col"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium break-words">{n.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-2 text-xs">
                        {n.processing ? (
                          <span className="text-muted-foreground">
                            Processing...
                          </span>
                        ) : n.serverId ? (
                          <span className="text-muted-foreground">
                            Stored on server
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Saved locally
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNotice(n.id)}
                        className="text-destructive"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
