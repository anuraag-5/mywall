import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AccountModal = ({
  accountNumber,
  publicKey,
  privateKey,
}: {
  accountNumber: number;
  publicKey: string;
  privateKey: string;
}) => (
  <AlertDialog>
    <AlertDialogTrigger className="px-8 py-2 bg-brand-primary font-bold text-[#ffffff] rounded-full">
      Show
    </AlertDialogTrigger>
    <AlertDialogContent className="bg-brand-primary rounded-[30px] border-none flex flex-col items-center justify-center">
      <AlertDialogHeader>
        <AlertDialogTitle>Account {accountNumber}</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="bg-brand-primary w-full flex flex-col items-center justify-center max-w-full">
        <div className="flex flex-col w-full max-w-full mb-2">
          <div className="font-bold mb-1">Public Key</div>
          <div className="p-4 bg-[#ffffff] rounded-full break-words max-w-full text-[10px]">
            {publicKey}
          </div>
        </div>
        <div className="flex flex-col w-full max-w-full">
          <div className="font-bold mb-1">Private Key</div>
          <div className="p-4 bg-[#ffffff] rounded-full break-words max-w-full text-[10px]">
            {privateKey}
          </div>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-brand rounded-full max-w-32">
          Close
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default AccountModal;
