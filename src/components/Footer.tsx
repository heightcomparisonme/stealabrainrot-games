import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/Steal a Brainrot', icon: '📘' },
    { name: 'Instagram', href: 'https://www.instagram.com/Steal a Brainrot/', icon: '📷' },
    { name: 'LinkedIn', href: 'https://it.linkedin.com/company/Steal a Brainrot', icon: '💼' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@Steal a Brainrot', icon: '🎵' },
    { name: 'YouTube', href: 'https://www.youtube.com/@Steal a Brainrotofficial', icon: '📺' },
    { name: 'X (Twitter)', href: 'https://x.com/Steal a Brainrot', icon: '𝕏' }
  ];

  const footerLinks = [
    { name: 'About Us', href: 'https://partners.Steal a Brainrot.com' },
    { name: 'Contact Us', href: 'https://partners.Steal a Brainrot.com/contact' },
    { name: 'Privacy Policy', href: '/privacy-cookie' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container-custom py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://ext.same-assets.com/54244373/3952684937.png"
                alt="Steal a Brainrot"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Experience the ultimate <strong>Brainrot collection game</strong>! Build your collection, generate income, and steal from others in this revolutionary Roblox-style strategy game. Play instantly with no downloads required!
            </p>
            <p className="text-sm text-muted-foreground">
              Start your Brainrot empire today — collect, steal, and dominate!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Follow Us</h3>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors duration-200 group"
                  title={social.name}
                >
                  <span className="text-2xl mb-1">{social.icon}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Game Categories Links */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="font-bold text-foreground mb-4">Game Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Brainrot Collection', 'Meme Characters', 'Income Generation', 'Stealing Mechanics',
              'Roblox Style', 'Strategy Games', 'Multiplayer', 'Free to Play',
              'Browser Games', 'Instant Play', 'Character Trading', 'Base Building'
            ].map((feature) => (
              <span
                key={feature}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p className="mb-1">
                Steal a Brainrot s.r.l. Via Marsala 29h<br />
                0185 Rome, Italy VAT: 12327731001<br />
                REA: RM-1365971
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              © 2025 Steal a Brainrot. All rights reserved.
            </div>
          </div>
        </div>

        {/* For Developers Section */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="text-center">
            <h3 className="font-bold text-foreground mb-2">Join the Brainrot Community</h3>
            <p className="text-muted-foreground mb-4">
              Connect with thousands of players worldwide in the ultimate Brainrot collection experience. Share strategies, trade characters, and compete for the top spot!
            </p>
            <a
              href="https://partners.stealabrainrot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Start Playing Now - Build Your Brainrot Empire
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
