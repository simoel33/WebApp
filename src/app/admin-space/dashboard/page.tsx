"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Mail, Phone, MapPin, Briefcase, Loader2 } from "lucide-react";

interface ContactMessage {
  id: string;
  email: string;
  name: string;
  role: string;
  country: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalMessages: number;
  totalPages: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMessages = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`/api/admin/messages?page=${page}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin-space");
          return;
        }
        setError(data.message || "Failed to load messages");
        return;
      }

      setMessages(data.messages);
      setPagination(data.pagination);
    } catch (err) {
      setError("An error occurred while loading messages");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMessages(currentPage);
  }, [currentPage, fetchMessages]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin-space");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        setSelectedMessage(null);
      } else {
        alert("Failed to delete message");
      }
    } catch (err) {
      alert("An error occurred while deleting the message");
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.trim() === '') {
      return 'No date';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-700">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              DataSync Admin
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4">
            <div className="rounded-lg bg-blue-50 px-4 py-3 dark:bg-blue-950/30">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Messages
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {pagination?.totalMessages || 0} total
              </p>
            </div>
          </nav>

          {/* Logout */}
          <div className="border-t border-slate-200 p-4 dark:border-slate-700">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white px-8 py-4 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Contact Messages
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and view all contact form submissions
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Messages List */}
          <div className="w-full flex-1 overflow-y-auto md:w-1/2 border-r border-slate-200 dark:border-slate-700">
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="m-4 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            {!isLoading && messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400">
                <p>No messages yet</p>
              </div>
            )}

            {!isLoading && messages.length > 0 && (
              <div className="space-y-2 p-4">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedMessage?.id === message.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white truncate">
                          {message.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {message.email}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="border-t border-slate-200 p-4 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 disabled:opacity-50 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 disabled:opacity-50 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="hidden w-1/2 flex-col overflow-y-auto md:flex border-l border-slate-200 dark:border-slate-700">
            {selectedMessage ? (
              <div className="flex flex-col h-full">
                {/* Detail Header */}
                <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Detail Content */}
                <div className="flex-1 space-y-6 p-6">
                  {/* Contact Info Grid */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Email
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white break-all">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Phone
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedMessage.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Role
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedMessage.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Country
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedMessage.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                      Message
                    </p>
                    <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-300">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400">
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
