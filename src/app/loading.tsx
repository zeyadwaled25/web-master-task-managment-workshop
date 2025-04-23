import Logo from "@/components/common/Logo";
import { LuLoaderCircle } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center space-y-6">
      <LuLoaderCircle className="text-primary animate-spin" size={64} />
      <Logo />
      <p className="text-muted-foreground text-lg">
        Please wait, your content is loading...
      </p>
    </div>
  );
}
