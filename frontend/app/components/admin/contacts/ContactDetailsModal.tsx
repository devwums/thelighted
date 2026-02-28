"use client";

import React from "react";
import { X, Mail, Phone, User, Calendar, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ContactSubmission, ContactStatus } from "@/lib/types/contact";
import { StatusBadge } from "./StatusBadge";
import { Button } from "../../ui/Button";

interface ContactDetailsModalProps {
  isOpen: boolean;
  contact: ContactSubmission | null;
  onClose: () => void;
  onUpdateStatus: (status: ContactStatus) => void;
  onDelete: () => void;
  isUpdating?: boolean;
}

export function ContactDetailsModal({
  isOpen,
  contact,
  onClose,
  onUpdateStatus,
  onDelete,
  isUpdating = false,
}: ContactDetailsModalProps) {
  if (!contact) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Contact Details
                    </h3>
                    <StatusBadge status={contact.status} />
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="text-base font-medium text-gray-900">
                        {contact.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-base font-medium text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {contact.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-base font-medium text-blue-600 hover:underline"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Submitted</div>
                      <div className="text-base font-medium text-gray-900">
                        {formatDistanceToNow(new Date(contact.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </div>
                  <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                    {contact.subject}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </div>
                  <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg whitespace-pre-wrap">
                    {contact.message}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between gap-3">
                  {/* Status Update */}
                  <div className="flex gap-2">
                    {contact.status !== ContactStatus.READ && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateStatus(ContactStatus.READ)}
                        disabled={isUpdating}
                      >
                        Mark as Read
                      </Button>
                    )}
                    {contact.status !== ContactStatus.REPLIED && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateStatus(ContactStatus.REPLIED)}
                        disabled={isUpdating}
                      >
                        Mark as Replied
                      </Button>
                    )}
                  </div>

                  {/* Delete */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={isUpdating}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
