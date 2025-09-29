import { ThemeProvider } from '../ThemeProvider';
import { Button } from '@/components/ui/button';

export default function ThemeProviderExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="p-6">
        <Button>Dark Theme Active</Button>
      </div>
    </ThemeProvider>
  );
}