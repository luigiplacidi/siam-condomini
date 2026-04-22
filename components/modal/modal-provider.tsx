"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { modalDefinitions, type ModalId } from "@/lib/site-content";

import { ModalForm } from "./modal-form";

type ModalContextValue = {
  activeModal: ModalId | null;
  openModal: (modalId: ModalId) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  useEffect(() => {
    if (!activeModal) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const value = useMemo(
    () => ({
      activeModal,
      openModal: (modalId: ModalId) => setActiveModal(modalId),
      closeModal: () => setActiveModal(null)
    }),
    [activeModal]
  );

  const modal = modalDefinitions.find((item) => item.id === activeModal);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {modal ? (
          <motion.div
            key={modal.id}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl border border-border bg-white p-6 shadow-soft"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{modal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{modal.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-secondary"
                  aria-label="Chiudi"
                >
                  <X size={18} />
                </button>
              </div>
              <ModalForm modal={modal} onSuccess={() => setActiveModal(null)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return context;
}
