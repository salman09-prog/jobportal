import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "#6A38C2",
          "--normal-text": "white",
          "--normal-border": "var(--border)"
        }
      }
      {...props} />
  );
}

export { Toaster }
