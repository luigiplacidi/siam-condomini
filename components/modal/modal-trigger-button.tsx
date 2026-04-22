"use client";

import { type ButtonHTMLAttributes } from "react";

import { type ModalId } from "@/lib/site-content";
import { Button, type ButtonProps } from "@/components/ui/button";

import { useModal } from "./modal-provider";

type ModalTriggerButtonProps = Omit<ButtonProps, "onClick"> & {
  modalId: ModalId;
};

export function ModalTriggerButton({ modalId, ...props }: ModalTriggerButtonProps) {
  const { openModal } = useModal();

  return <Button {...props} onClick={() => openModal(modalId)} />;
}

type RawTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  modalId: ModalId;
};

export function RawModalTrigger({ modalId, className, onClick, ...props }: RawTriggerProps) {
  const { openModal } = useModal();

  return (
    <button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        openModal(modalId);
      }}
      className={className}
      type={props.type ?? "button"}
    />
  );
}
