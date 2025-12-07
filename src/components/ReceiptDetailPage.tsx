import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Receipt,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Hash,
  DollarSign,
  Percent,
  FileText,
  Shield,
  QrCode,
  Star,
  Award,
  Sparkles,
  Heart,
  Send,
} from 'lucide-react';
import { Receipt as ReceiptType, formatCurrency, formatDateTime } from '../utils/receipt-utils';
import { motion } from 'motion/react';

interface ReceiptDetailPageProps {
  receipt: ReceiptType;
  onBack: () => void;
}

// Canvas background component with particles and gradient animation
const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309'];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrame: number;
    let gradientOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated gradient background
      gradientOffset += 0.002;
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      
      const offset1 = (Math.sin(gradientOffset) + 1) / 2;
      const offset2 = (Math.cos(gradientOffset * 1.5) + 1) / 2;
      
      gradient.addColorStop(0, `rgba(252, 211, 77, ${0.05 + offset1 * 0.05})`);
      gradient.addColorStop(0.5, `rgba(251, 191, 36, ${0.03 + offset2 * 0.03})`);
      gradient.addColorStop(1, `rgba(217, 119, 6, ${0.05 + offset1 * 0.05})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulse opacity
        particle.opacity = 0.1 + Math.sin(Date.now() * 0.001 + particle.x) * 0.2;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        glowGradient.addColorStop(0, `${particle.color}40`);
        glowGradient.addColorStop(1, `${particle.color}00`);
        ctx.fillStyle = glowGradient;
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(252, 211, 77, ${(1 - distance / 150) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default function ReceiptDetailPage({ receipt, onBack }: ReceiptDetailPageProps) {
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'csv'>('pdf');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti for profitable trades
  useEffect(() => {
    if (receipt.profitLoss > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [receipt.profitLoss]);

  const handleDownload = (format: 'pdf' | 'csv') => {
    console.log(`Downloading receipt ${receipt.receiptId} as ${format.toUpperCase()}`);
    alert(`Receipt downloaded as ${format.toUpperCase()}`);
  };

  const handleShare = (method: 'email' | 'whatsapp') => {
    console.log(`Sharing receipt ${receipt.receiptId} via ${method}`);
    alert(`Receipt shared via ${method}`);
    setShowShareMenu(false);
  };

  // Calculate achievements
  const isLargeProfit = receipt.profitLoss > 10000;
  const isProfitable = receipt.profitLoss > 0;
  const isLargeTrade = receipt.tradeValue > 50000;

  return (
    <div className="min-h-screen relative">
      {/* Animated Canvas Background */}
      <CanvasBackground />

      {/* Confetti Effect for Profit */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, x: `${Math.random() * 100}%`, opacity: 1, rotate: 0 }}
              animate={{ 
                y: '100vh', 
                x: `${Math.random() * 100}%`,
                opacity: 0,
                rotate: 360
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
              className="absolute"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 p-6 space-y-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300 group bg-card px-6 py-3 rounded-2xl border border-border hover:border-yellow-500/50 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Receipts</span>
        </motion.button>

        {/* Personal Greeting Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative bg-card border-2 border-yellow-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* User Avatar */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white shadow-xl border-4 border-background">
                    <User className="w-10 h-10" />
                  </div>
                  {isProfitable && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-background shadow-lg"
                    >
                      <Star className="w-4 h-4 text-white fill-white" />
                    </motion.div>
                  )}
                </motion.div>
                
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Hello,</p>
                  <h2 className="text-foreground text-3xl">{receipt.userName}</h2>
                  <p className="text-muted-foreground text-sm mt-2 flex items-center gap-2">
                    {isProfitable ? (
                      <>
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        Congratulations on your profit!
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-yellow-500" />
                        Thank you for trading with ZONIX
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-4 bg-accent hover:bg-yellow-500/20 border-2 border-border hover:border-yellow-500/50 rounded-2xl transition-all duration-300 shadow-lg"
                  >
                    <Share2 className="w-5 h-5 text-foreground" />
                  </motion.button>
                  
                  {showShareMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-card border-2 border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden z-10"
                    >
                      <button
                        onClick={() => handleShare('email')}
                        className="w-full px-4 py-3 text-left text-foreground/80 hover:bg-yellow-500/10 transition-colors duration-200 flex items-center gap-3 border-b border-border"
                      >
                        <Mail className="w-4 h-4 text-yellow-500" />
                        Email
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full px-4 py-3 text-left text-foreground/80 hover:bg-yellow-500/10 transition-colors duration-200 flex items-center gap-3"
                      >
                        <Send className="w-4 h-4 text-yellow-500" />
                        WhatsApp
                      </button>
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload('pdf')}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-3 border-2 border-yellow-500/50"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </motion.button>
              </div>
            </div>

            {/* Achievement Badges */}
            {(isLargeProfit || isLargeTrade) && (
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {isLargeProfit && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/30 rounded-xl shadow-lg"
                  >
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-600 dark:text-yellow-400">Big Win! 🎯</span>
                  </motion.div>
                )}
                {isLargeTrade && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-2 border-purple-500/30 rounded-xl shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <span className="text-purple-600 dark:text-purple-400">High Value Trade</span>
                  </motion.div>
                )}
              </div>
            )}

            {/* Professional Header */}
            <div className="text-center mb-6 pb-6 border-t-2 border-border pt-6 mt-2">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="inline-block mb-4"
              >
                <div className="p-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl">
                  <Receipt className="w-14 h-14 text-white" />
                </div>
              </motion.div>
              <h2 className="text-foreground text-4xl mb-2">ZONIX</h2>
              <p className="text-muted-foreground mb-1 text-lg">Trade the Heartbeat of Bharat</p>
              <p className="text-muted-foreground">Official Trade Receipt</p>
              <p className="text-muted-foreground text-sm mt-3 flex items-center justify-center gap-2 flex-wrap">
                <span>www.zonix.tech</span>
                <span>•</span>
                <span>support@zonix.tech</span>
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {receipt.status === 'completed' ? (
                  <div className="flex items-center gap-3 px-10 py-5 bg-green-500/20 border-2 border-green-500/40 rounded-2xl shadow-xl">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 text-lg">Transaction Completed</span>
                  </div>
                ) : receipt.status === 'pending' ? (
                  <div className="flex items-center gap-3 px-10 py-5 bg-yellow-500/20 border-2 border-yellow-500/40 rounded-2xl shadow-xl">
                    <AlertCircle className="w-7 h-7 text-yellow-500" />
                    <span className="text-yellow-600 dark:text-yellow-400 text-lg">Transaction Pending</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-10 py-5 bg-red-500/20 border-2 border-red-500/40 rounded-2xl shadow-xl">
                    <XCircle className="w-7 h-7 text-red-500" />
                    <span className="text-red-600 dark:text-red-400 text-lg">Transaction Failed</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Receipt Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card border-2 border-yellow-500/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-foreground flex items-center gap-2 mb-6 text-xl">
                <FileText className="w-6 h-6 text-yellow-500" />
                Transaction Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Receipt ID</span>
                  </div>
                  <span className="text-foreground font-mono bg-yellow-500/10 px-3 py-1 rounded-lg">{receipt.receiptId}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Date & Time</span>
                  </div>
                  <span className="text-foreground">{formatDateTime(receipt.timestamp)}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">User</span>
                  </div>
                  <span className="text-foreground">{receipt.userName}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {receipt.type === 'BUY' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-muted-foreground">Type</span>
                  </div>
                  <span className={`px-5 py-2 rounded-lg text-lg shadow-lg ${
                    receipt.type === 'BUY'
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-2 border-green-500/40'
                      : 'bg-red-500/20 text-red-600 dark:text-red-400 border-2 border-red-500/40'
                  }`}>
                    {receipt.type}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Status</span>
                  </div>
                  <span className={`px-5 py-2 rounded-lg shadow-lg ${
                    receipt.status === 'completed'
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-2 border-green-500/40'
                      : receipt.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-2 border-yellow-500/40'
                      : 'bg-red-500/20 text-red-600 dark:text-red-400 border-2 border-red-500/40'
                  }`}>
                    {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trade Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card border-2 border-yellow-500/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-foreground flex items-center gap-2 mb-6 text-xl">
                <DollarSign className="w-6 h-6 text-yellow-500" />
                Trade Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <span className="text-muted-foreground">Token</span>
                  <span className="text-foreground text-lg">{receipt.tokenName}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <span className="text-muted-foreground">Symbol</span>
                  <span className="text-foreground font-mono bg-yellow-500/10 px-3 py-1 rounded-lg">{receipt.tokenSymbol}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="text-foreground">{receipt.quantity} tokens</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b-2 border-border hover:border-yellow-500/50 transition-colors">
                  <span className="text-muted-foreground">Price per Token</span>
                  <span className="text-foreground">{formatCurrency(receipt.pricePerUnit)}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Total Trade Value</span>
                  <span className="text-yellow-600 dark:text-yellow-400 text-xl">{formatCurrency(receipt.tradeValue)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profit/Loss Card - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative group"
        >
          <div className={`absolute -inset-1 rounded-3xl blur-xl ${
            receipt.profitLoss >= 0
              ? 'bg-gradient-to-br from-green-400 to-green-600 opacity-30'
              : 'bg-gradient-to-br from-red-400 to-red-600 opacity-30'
          } group-hover:opacity-50 transition-opacity duration-500`} />
          
          <div className={`relative overflow-hidden rounded-3xl shadow-2xl border-4 ${
            receipt.profitLoss >= 0
              ? 'bg-card border-green-500/50'
              : 'bg-card border-red-500/50'
          }`}>
            <div className="p-8">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: receipt.profitLoss >= 0 ? 10 : -10 }}
                    className={`p-6 rounded-3xl shadow-2xl ${
                      receipt.profitLoss >= 0 ? 'bg-green-500/40' : 'bg-red-500/40'
                    }`}
                  >
                    {receipt.profitLoss >= 0 ? (
                      <TrendingUp className="w-12 h-12 text-green-500" />
                    ) : (
                      <TrendingDown className="w-12 h-12 text-red-500" />
                    )}
                  </motion.div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-lg">Profit / Loss</p>
                    <p className={`text-5xl ${
                      receipt.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {receipt.profitLoss >= 0 ? '+' : ''}{formatCurrency(receipt.profitLoss)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {receipt.profitLoss >= 0 
                        ? '✨ Well done! Keep up the momentum' 
                        : '💪 Stay strong! Every trade is a learning opportunity'}
                    </p>
                  </div>
                </div>

                {receipt.rebateApplied && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-4 bg-green-500/30 border-2 border-green-500/50 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-5 h-5 text-green-500 fill-green-500" />
                      <p className="text-green-600 dark:text-green-400 text-lg">10% Rebate Applied</p>
                    </div>
                    <p className="text-green-600 dark:text-green-400 text-sm">Loss Protection Active</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fee Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-card border-2 border-yellow-500/30 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-foreground flex items-center gap-2 mb-6 text-xl">
              <Percent className="w-6 h-6 text-yellow-500" />
              Fee & Charges Breakdown
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b-2 border-border">
                <div>
                  <p className="text-foreground">Trade Fee</p>
                  <p className="text-muted-foreground text-sm">Base transaction fee</p>
                </div>
                <span className="text-foreground text-lg">{formatCurrency(receipt.tradeFee)}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b-2 border-border">
                <div>
                  <p className="text-foreground">Commission (0.75% on profit)</p>
                  <p className="text-muted-foreground text-sm">
                    {receipt.profitLoss > 0 
                      ? `0.75% of ${formatCurrency(receipt.profitLoss)}` 
                      : 'No commission on loss'}
                  </p>
                </div>
                <span className="text-foreground text-lg">{formatCurrency(receipt.commission)}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b-2 border-border">
                <div>
                  <p className="text-foreground">Government Charges (18% GST)</p>
                  <p className="text-muted-foreground text-sm">GST on trade fee</p>
                </div>
                <span className="text-foreground text-lg">{formatCurrency(receipt.gst)}</span>
              </div>

              {receipt.rebateApplied && (
                <div className="flex items-center justify-between py-3 border-b-2 border-green-500/50">
                  <div>
                    <p className="text-green-600 dark:text-green-400">Rebate Discount (10%)</p>
                    <p className="text-green-600 dark:text-green-400 text-sm">Loss protection benefit</p>
                  </div>
                  <span className="text-green-600 dark:text-green-400 text-lg">-{formatCurrency(5)}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-6 mt-4 pt-6 border-t-4 border-yellow-500/50 bg-yellow-500/10 rounded-xl px-4">
                <div>
                  <p className="text-foreground text-xl">Final Payable Amount</p>
                  <p className="text-muted-foreground text-sm">Total charges incurred</p>
                </div>
                <span className="text-yellow-600 dark:text-yellow-400 text-3xl">{formatCurrency(receipt.finalPayable)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card border-2 border-yellow-500/30 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-foreground flex items-center gap-2 mb-4 text-xl">
                <QrCode className="w-6 h-6 text-yellow-500" />
                Receipt Verification
              </h3>
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-56 h-56 bg-white rounded-2xl p-6 mb-6 flex items-center justify-center shadow-2xl border-4 border-yellow-500/30"
                >
                  <div className="text-center">
                    <QrCode className="w-40 h-40 text-gray-800 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">Scan to Verify</p>
                  </div>
                </motion.div>
                <p className="text-muted-foreground text-sm text-center max-w-xs">
                  Scan this QR code to verify the authenticity of this receipt on the blockchain
                </p>
              </div>
            </div>
          </motion.div>

          {/* Download Options */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card border-2 border-yellow-500/30 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-foreground flex items-center gap-2 mb-4 text-xl">
                <Download className="w-6 h-6 text-yellow-500" />
                Download Options
              </h3>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload('pdf')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-yellow-500/50 text-lg"
                >
                  <Download className="w-6 h-6" />
                  Download as PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload('csv')}
                  className="w-full px-6 py-4 bg-accent border-2 border-border hover:border-yellow-500/50 text-foreground rounded-xl hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FileText className="w-6 h-6" />
                  Download as CSV
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleShare('email')}
                  className="w-full px-6 py-4 bg-accent border-2 border-border hover:border-yellow-500/50 text-foreground rounded-xl hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail className="w-6 h-6" />
                  Email Receipt
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Professional Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg" />
          <div className="relative bg-card border-2 border-yellow-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="border-t-2 border-border pt-6">
              <p className="text-muted-foreground mb-3 text-lg">
                📝 <strong>Disclaimer:</strong> All trades are final and subject to government taxes and ZONIX policies.
              </p>
              <p className="text-foreground mb-3 text-lg">
                Thank you for trading with <span className="text-yellow-600 dark:text-yellow-400">ZONIX</span> 💛
              </p>
              <p className="text-muted-foreground mb-4">
                This receipt is digitally signed and verified by ZONIX Technologies.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span>Powered by ZONIX Technologies © 2025</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
