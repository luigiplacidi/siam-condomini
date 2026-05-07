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
            className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden bg-slate-950/50 p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="flex max-h-[100svh] w-full flex-col overflow-hidden rounded-t-3xl border border-border bg-white shadow-soft sm:max-h-[calc(100svh-2rem)] sm:max-w-2xl sm:rounded-3xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border bg-white/95 p-4 backdrop-blur sm:p-6">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">{modal.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{modal.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="shrink-0 rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-secondary"
                  aria-label="Chiudi"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-5">
                <ModalForm modal={modal} onSuccess={() => setActiveModal(null)} />
              </div>
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
