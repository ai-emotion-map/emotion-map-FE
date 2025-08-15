import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// 1. 취소 + 확인 버튼
// 취소 - 팝업 닫기 / 확인 - 다음 페이지로 이동 (다른 함수)
// 2. 확인 버튼
// 확인 - 팝업 닫기 또는 다른 페이지로 이동

type LayerPopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void; // 팝업 상태 관리
  onConfirm?: () => void;
  type?: string;
  title: string;
  description: string;
};

const LayerPopup = ({
  open, // 팝업 오픈 여부
  onOpenChange,
  type = "confirm",
  title,
  onConfirm,
  description,
}: LayerPopupProps) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onOpenChange(false);
  };

  const closeButtonStyle =
    "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm";
  const confirmButtonStyle =
    "px-4 py-2 rounded bg-sub-green hover:bg-main-green text-sm";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-base">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {type !== "confirm" ? (
          <DialogFooter>
            <DialogClose asChild>
              <button className={closeButtonStyle}>취소</button>
            </DialogClose>
            <button className={confirmButtonStyle} onClick={handleConfirm}>
              확인
            </button>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <DialogClose asChild>
              <button className={confirmButtonStyle} onClick={handleConfirm}>
                확인
              </button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LayerPopup;
