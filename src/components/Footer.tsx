import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/GamePix', icon: '📘' },
    { name: 'Instagram', href: 'https://www.instagram.com/gamepix/', icon: '📷' },
    { name: 'LinkedIn', href: 'https://it.linkedin.com/company/gamepix', icon: '💼' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@gamepix', icon: '🎵' },
    { name: 'YouTube', href: 'https://www.youtube.com/@Gamepixofficial', icon: '📺' },
    { name: 'X (Twitter)', href: 'https://x.com/gamepix', icon: '𝕏' }
  ];

  const footerLinks = [
    { name: 'About Us', href: 'https://partners.gamepix.com' },
    { name: 'Contact Us', href: 'https://partners.gamepix.com/contact' },
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
                alt="GamePix"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              GamePix is your gateway to the best <strong>free online games</strong>, offering instant access to thousands of titles. No lengthy installs or interruptions — just pick a game and play anywhere, on any device!
            </p>
            <p className="text-sm text-muted-foreground">
              Unlock the fun of GamePix — start playing today!
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
          <h3 className="font-bold text-foreground mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Action Games', 'Puzzle Games', 'Racing Games', 'Sports Games',
              'IO Games', 'Casual Games', 'Kids Games', 'Shooter Games',
              'Adventure Games', 'Strategy Games', 'RPG Games', 'Card Games'
            ].map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p className="mb-1">
                GamePix s.r.l. Via Marsala 29h<br />
                0185 Rome, Italy VAT: 12327731001<br />
                REA: RM-1365971
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              © 2025 GamePix. All rights reserved.
            </div>
          </div>
        </div>

        {/* For Developers Section */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="text-center">
            <h3 className="font-bold text-foreground mb-2">For Developers</h3>
            <p className="text-muted-foreground mb-4">
              GamePix isn’t just for players — we provide a platform for developers to reach a global audience.
            </p>
            <a
              href="https://partners.gamepix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Join us and bring your games to millions of passionate players
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
