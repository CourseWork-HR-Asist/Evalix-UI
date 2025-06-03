
import React from 'react';

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
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
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
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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
