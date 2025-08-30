import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Download, FileImage, Code, ArrowLeft } from "lucide-react";

interface LogoVariant {
  id: string;
  name: string;
  description: string;
  component: React.ReactNode;
  svgContent: string;
}

export default function LogoAssets() {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');

  // Logo variants with their SVG content
  const logoVariants: LogoVariant[] = [
    {
      id: 'horizontal',
      name: 'Horizontal Logo',
      description: 'Full logo with icon and text side by side',
      component: <HorizontalLogo theme={selectedTheme} />,
      svgContent: getHorizontalLogoSVG(selectedTheme)
    },
    {
      id: 'stacked',
      name: 'Stacked Logo',
      description: 'Icon above text, perfect for square spaces',
      component: <StackedLogo theme={selectedTheme} />,
      svgContent: getStackedLogoSVG(selectedTheme)
    },
    {
      id: 'icon',
      name: 'Icon Only',
      description: 'Just the geometric icon, no text',
      component: <IconOnly theme={selectedTheme} />,
      svgContent: getIconOnlySVG(selectedTheme)
    }
  ];

  const downloadSVG = (variant: LogoVariant, size: string) => {
    const blob = new Blob([variant.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aliase-media-${variant.id}-${selectedTheme}-${size}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async (variant: LogoVariant, size: string) => {
    try {
      // High-definition dimensions for true HD quality
      const dimensions = {
        small: { width: 512, height: getDimensionsForVariant(variant.id, 512) },
        medium: { width: 1024, height: getDimensionsForVariant(variant.id, 1024) },
        large: { width: 2048, height: getDimensionsForVariant(variant.id, 2048) }
      };
      
      const { width, height } = dimensions[size as keyof typeof dimensions];
      
      // Create high-DPI canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Set actual canvas size for HD quality
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      
      // Scale canvas back down using CSS
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Scale the drawing context up for HD quality
      ctx.scale(devicePixelRatio, devicePixelRatio);
      
      // Set high-quality rendering options
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Set background color based on theme
      ctx.fillStyle = selectedTheme === 'dark' ? '#0a0a0f' : '#ffffff';
      ctx.fillRect(0, 0, width, height);
      
      // Create and load the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          try {
            // Calculate centering for the logo
            const logoWidth = width * 0.8; // 80% of canvas width for padding
            const logoHeight = height * 0.8; // 80% of canvas height for padding
            const x = (width - logoWidth) / 2;
            const y = (height - logoHeight) / 2;
            
            // Draw the image with high quality
            ctx.drawImage(img, x, y, logoWidth, logoHeight);
            resolve(true);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        
        // Convert SVG to data URL
        const svgData = encodeURIComponent(variant.svgContent);
        img.src = `data:image/svg+xml;charset=utf-8,${svgData}`;
      });
      
      // Convert canvas to blob with high quality
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0); // Maximum quality
      });
      
      if (!blob) {
        throw new Error('Failed to create PNG blob');
      }
      
      // Download the file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aliase-media-${variant.id}-${selectedTheme}-${size}-hd.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to generate PNG file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => window.location.hash = ''}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-foreground"
          >
            Aliase Media Logo Assets
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Download high-quality logo files in various formats and sizes
          </motion.p>
          
          {/* Theme Toggle */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={selectedTheme === 'light' ? 'default' : 'outline'}
              onClick={() => setSelectedTheme('light')}
              size="sm"
            >
              Light Theme
            </Button>
            <Button
              variant={selectedTheme === 'dark' ? 'default' : 'outline'}
              onClick={() => setSelectedTheme('dark')}
              size="sm"
            >
              Dark Theme
            </Button>
          </div>
        </div>

        {/* Logo Variants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logoVariants.map((variant, index) => (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{variant.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{variant.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Logo Preview */}
                  <div 
                    className={`flex items-center justify-center h-32 rounded-lg border-2 ${
                      selectedTheme === 'dark' 
                        ? 'bg-slate-900 border-slate-700' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    {variant.component}
                  </div>
                  
                  {/* Download Options */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">SVG Format</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'small', label: 'SM', description: '512px' },
                        { key: 'medium', label: 'MD', description: '1024px' },
                        { key: 'large', label: 'HD', description: '2048px' }
                      ].map((sizeOption) => (
                        <Button
                          key={sizeOption.key}
                          variant="outline"
                          size="sm"
                          onClick={() => downloadSVG(variant, sizeOption.key)}
                          className="text-xs flex flex-col h-auto py-2"
                          title={`Download ${sizeOption.description} SVG`}
                        >
                          <Download className="h-3 w-3 mb-1" />
                          <span>{sizeOption.label}</span>
                          <span className="text-[10px] opacity-70">{sizeOption.description}</span>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <FileImage className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">PNG Format (HD Quality)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'small', label: 'SM', description: '512px' },
                        { key: 'medium', label: 'MD', description: '1024px' },
                        { key: 'large', label: 'HD', description: '2048px' }
                      ].map((sizeOption) => (
                        <Button
                          key={sizeOption.key}
                          variant="outline"
                          size="sm"
                          onClick={() => downloadPNG(variant, sizeOption.key)}
                          className="text-xs flex flex-col h-auto py-2"
                          title={`Download ${sizeOption.description} HD PNG`}
                        >
                          <Download className="h-3 w-3 mb-1" />
                          <span>{sizeOption.label}</span>
                          <span className="text-[10px] opacity-70">{sizeOption.description}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">When to use each variant:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Badge variant="secondary" className="mr-2">Horizontal</Badge>Business cards, letterheads, wide headers</li>
                    <li><Badge variant="secondary" className="mr-2">Stacked</Badge>Social media profiles, app icons, square spaces</li>
                    <li><Badge variant="secondary" className="mr-2">Icon Only</Badge>Favicons, watermarks, minimal branding</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">File format & size guidelines:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Badge variant="outline" className="mr-2">SVG</Badge>Web use, scalable graphics, print materials</li>
                    <li><Badge variant="outline" className="mr-2">PNG HD</Badge>Social media, presentations, high-res printing</li>
                    <li><Badge variant="secondary" className="mr-2">SM (512px)</Badge>Social media profiles, web icons</li>
                    <li><Badge variant="secondary" className="mr-2">MD (1024px)</Badge>Presentations, medium print</li>
                    <li><Badge variant="secondary" className="mr-2">HD (2048px)</Badge>Large format printing, billboards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Logo Components
function HorizontalLogo({ theme }: { theme: 'light' | 'dark' }) {
  const colors = getThemeColors(theme);
  return (
    <div className="flex items-center gap-3">
      <LogoIcon theme={theme} size={32} />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight" style={{ color: colors.navy }}>
          ALIASE
        </span>
        <span className="text-xs font-medium tracking-widest mt-0.5" style={{ color: colors.charcoal }}>
          MEDIA
        </span>
      </div>
    </div>
  );
}

function StackedLogo({ theme }: { theme: 'light' | 'dark' }) {
  const colors = getThemeColors(theme);
  return (
    <div className="flex flex-col items-center gap-2">
      <LogoIcon theme={theme} size={40} />
      <div className="flex flex-col items-center leading-none">
        <span className="text-lg font-bold tracking-tight" style={{ color: colors.navy }}>
          ALIASE
        </span>
        <span className="text-xs font-medium tracking-widest mt-0.5" style={{ color: colors.charcoal }}>
          MEDIA
        </span>
      </div>
    </div>
  );
}

function IconOnly({ theme }: { theme: 'light' | 'dark' }) {
  return <LogoIcon theme={theme} size={48} />;
}

function LogoIcon({ theme, size }: { theme: 'light' | 'dark'; size: number }) {
  const colors = getThemeColors(theme);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`growthGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.navy} />
          <stop offset="50%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.accent} />
        </linearGradient>
        <linearGradient id={`accentGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
      </defs>
      
      <path
        d="M20 2 L35 20 L20 38 L5 20 Z"
        fill={`url(#growthGradient-${theme})`}
        opacity="0.08"
      />
      
      <circle cx="20" cy="20" r="3.5" fill={`url(#growthGradient-${theme})`} />
      
      <path
        d="M20 7 L20 13 M13 20 L7 20 M20 33 L20 27 M27 20 L33 20"
        stroke={`url(#growthGradient-${theme})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      
      <circle cx="20" cy="7" r="2.2" fill={`url(#accentGradient-${theme})`} />
      <circle cx="7" cy="20" r="2.2" fill={`url(#accentGradient-${theme})`} />
      <circle cx="33" cy="20" r="2.2" fill={`url(#accentGradient-${theme})`} />
      <circle cx="20" cy="33" r="2.2" fill={`url(#accentGradient-${theme})`} />
      
      <circle 
        cx="20" 
        cy="20" 
        r="18.5" 
        fill="none" 
        stroke={`url(#growthGradient-${theme})`} 
        strokeWidth="0.6"
        opacity="0.25"
      />
    </svg>
  );
}

// Helper Functions
function getThemeColors(theme: 'light' | 'dark') {
  return theme === 'dark' 
    ? {
        navy: '#3b82f6',
        charcoal: '#d1d5db',
        accent: '#8b5cf6',
        primary: '#3b82f6'
      }
    : {
        navy: '#1e3a8a',
        charcoal: '#374151',
        accent: '#6366f1',
        primary: '#3b82f6'
      };
}

function getDimensionsForVariant(variantId: string, baseWidth: number) {
  // Return appropriate height based on logo variant proportions
  switch (variantId) {
    case 'horizontal':
      return Math.round(baseWidth * 0.4); // 200:80 ratio
    case 'stacked':
      return Math.round(baseWidth * 1.17); // 120:140 ratio
    case 'icon':
      return baseWidth; // 1:1 ratio (square)
    default:
      return baseWidth;
  }
}

function getHorizontalLogoSVG(theme: 'light' | 'dark'): string {
  const colors = getThemeColors(theme);
  const uniqueId = `horizontal-${theme}-${Date.now()}`;
  return `
<svg width="500" height="200" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="growthGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.navy}" />
      <stop offset="50%" stop-color="${colors.primary}" />
      <stop offset="100%" stop-color="${colors.accent}" />
    </linearGradient>
    <linearGradient id="accentGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.accent}" />
      <stop offset="100%" stop-color="${colors.primary}" />
    </linearGradient>
  </defs>
  
  <!-- Logo Icon -->
  <g transform="translate(50, 50)">
    <path d="M50 5 L87.5 50 L50 95 L12.5 50 Z" fill="url(#growthGradient-${uniqueId})" opacity="0.08" />
    <circle cx="50" cy="50" r="8.75" fill="url(#growthGradient-${uniqueId})" />
    <path d="M50 17.5 L50 32.5 M32.5 50 L17.5 50 M50 82.5 L50 67.5 M67.5 50 L82.5 50" stroke="url(#growthGradient-${uniqueId})" stroke-width="7" stroke-linecap="round" />
    <circle cx="50" cy="17.5" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="17.5" cy="50" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="82.5" cy="50" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="50" cy="82.5" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="50" cy="50" r="46.25" fill="none" stroke="url(#growthGradient-${uniqueId})" stroke-width="1.5" opacity="0.25" />
  </g>
  
  <!-- Text -->
  <text x="200" y="115" font-family="Arial, sans-serif" font-weight="bold" font-size="60" fill="${colors.navy}">ALIASE</text>
  <text x="200" y="145" font-family="Arial, sans-serif" font-weight="500" font-size="25" letter-spacing="5px" fill="${colors.charcoal}">MEDIA</text>
</svg>`;
}

function getStackedLogoSVG(theme: 'light' | 'dark'): string {
  const colors = getThemeColors(theme);
  const uniqueId = `stacked-${theme}-${Date.now()}`;
  return `
<svg width="300" height="350" viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="growthGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.navy}" />
      <stop offset="50%" stop-color="${colors.primary}" />
      <stop offset="100%" stop-color="${colors.accent}" />
    </linearGradient>
    <linearGradient id="accentGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.accent}" />
      <stop offset="100%" stop-color="${colors.primary}" />
    </linearGradient>
  </defs>
  
  <!-- Logo Icon -->
  <g transform="translate(100, 50)">
    <path d="M50 5 L87.5 50 L50 95 L12.5 50 Z" fill="url(#growthGradient-${uniqueId})" opacity="0.08" />
    <circle cx="50" cy="50" r="8.75" fill="url(#growthGradient-${uniqueId})" />
    <path d="M50 17.5 L50 32.5 M32.5 50 L17.5 50 M50 82.5 L50 67.5 M67.5 50 L82.5 50" stroke="url(#growthGradient-${uniqueId})" stroke-width="7" stroke-linecap="round" />
    <circle cx="50" cy="17.5" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="17.5" cy="50" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="82.5" cy="50" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="50" cy="82.5" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="50" cy="50" r="46.25" fill="none" stroke="url(#growthGradient-${uniqueId})" stroke-width="1.5" opacity="0.25" />
  </g>
  
  <!-- Text -->
  <text x="150" y="250" font-family="Arial, sans-serif" font-weight="bold" font-size="50" text-anchor="middle" fill="${colors.navy}">ALIASE</text>
  <text x="150" y="285" font-family="Arial, sans-serif" font-weight="500" font-size="20" letter-spacing="5px" text-anchor="middle" fill="${colors.charcoal}">MEDIA</text>
</svg>`;
}

function getIconOnlySVG(theme: 'light' | 'dark'): string {
  const colors = getThemeColors(theme);
  const uniqueId = `icon-${theme}-${Date.now()}`;
  return `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="growthGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.navy}" />
      <stop offset="50%" stop-color="${colors.primary}" />
      <stop offset="100%" stop-color="${colors.accent}" />
    </linearGradient>
    <linearGradient id="accentGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.accent}" />
      <stop offset="100%" stop-color="${colors.primary}" />
    </linearGradient>
  </defs>
  
  <g transform="translate(50, 50)">
    <path d="M50 5 L87.5 50 L50 95 L12.5 50 Z" fill="url(#growthGradient-${uniqueId})" opacity="0.08" />
    <circle cx="50" cy="50" r="8.75" fill="url(#growthGradient-${uniqueId})" />
    <path d="M50 17.5 L50 32.5 M32.5 50 L17.5 50 M50 82.5 L50 67.5 M67.5 50 L82.5 50" stroke="url(#growthGradient-${uniqueId})" stroke-width="7" stroke-linecap="round" />
    <circle cx="50" cy="17.5" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="17.5" cy="50" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="82.5" cy="50" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="50" cy="82.5" r="5.5" fill="url(#accentGradient-${uniqueId})" />
    <circle cx="50" cy="50" r="46.25" fill="none" stroke="url(#growthGradient-${uniqueId})" stroke-width="1.5" opacity="0.25" />
  </g>
</svg>`;
}