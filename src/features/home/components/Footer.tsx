
const connectLinkList = [
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017..."
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239..." />
      </svg>
    ),
  },
];

const ConnectLinks = () => (
  <div>
    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
      Connect
    </h4>
    <div className="flex space-x-4">
      {connectLinkList.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition"
        >
          <span className="sr-only">{link.name}</span>
          {link.icon}
        </a>
      ))}
    </div>
    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
      Contact us:{" "}
      <a
        href="mailto:info@evalix.com"
        className="text-brand-500 hover:underline"
      >
        info@evalix.com
      </a>
    </p>
  </div>
);

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
      {title}
    </h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="text-gray-600 hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-400 transition"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const navigationLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ];

  const bottomLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Sitemap", href: "#" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 w-full py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evalix
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Modern recruitment platform that helps companies find the best
              talent efficiently.
            </p>
          </div>

          <FooterSection title="Navigation" links={navigationLinks} />
          <FooterSection title="Legal" links={legalLinks} />
          <ConnectLinks />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Evalix. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {bottomLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
