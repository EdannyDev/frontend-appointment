import { useState } from "react";
import {
  Overlay,
  Dialog,
  DialogTitle,
  DialogBody,
  WarningIcon,
  DialogMessage,
  DialogFooter,
  ConfirmAction,
  CancelAction,
} from "@/styles/modal.styles";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

// Modal de confirmación reutilizable para acciones destructivas
export default function Modal({
  visible,
  title = "Confirmando acción",
  message,
  onConfirm,
  onCancel,
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  useLockBodyScroll(visible);

  if (!visible) return null;

  const handleConfirm = async () => {
    if (isConfirming) return;
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Overlay>
      <Dialog>
        <DialogTitle>{title}</DialogTitle>
        <DialogBody>
          <WarningIcon>
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </WarningIcon>
          <DialogMessage>{message}</DialogMessage>
        </DialogBody>
        <DialogFooter>
          <CancelAction onClick={onCancel} disabled={isConfirming}>
            Cancelar
          </CancelAction>
          <ConfirmAction onClick={handleConfirm} disabled={isConfirming}>
            {isConfirming ? "Procesando..." : "Confirmar"}
          </ConfirmAction>
        </DialogFooter>
      </Dialog>
    </Overlay>
  );
}