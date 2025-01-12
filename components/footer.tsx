import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
  RedditIcon,
} from "@/components/icons";

export const Footer = () => {
  return (
    <footer className={`w-full border-t-0 border-default-200`}>
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {/* Sosyal medya linkleri */}
          <Button
            isIconOnly
            className="text-default-500 hover:text-default-900"
            variant="light"
            as={Link}
            href="https://x.com/ArslanKucukkafa"
            target="_blank"
          >
            <TwitterIcon className="h-5 w-5" />
          </Button>
          <Button
            isIconOnly
            className="text-default-500 hover:text-default-900"
            variant="light"
            as={Link}
            href="https://github.com/ArslanKucukkafa"
            target="_blank"
          >
            <GithubIcon className="h-5 w-5" />
          </Button>
          <Button
            isIconOnly
            className="text-default-500 hover:text-default-900"
            variant="light"
            as={Link}
            href="https://www.linkedin.com/in/arslan-k%C3%BC%C3%A7%C3%BCkkafa-69b1431aa/"
            target="_blank"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Button>
          <Button
            isIconOnly
            className="text-default-500 hover:text-default-900"
            variant="light"
            as={Link}
            href="https://www.reddit.com/user/arslan_kkafa19/"
            target="_blank"
          >
            <RedditIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigasyon linkleri */}
        <nav className="mt-8 md:order-1 md:mt-0">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                href="/"
                className="text-sm text-default-500 hover:text-default-900"
              >
                ARSLAN KUCUKKAFA
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Alt bilgi */}
      <div className="bg-default-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-default-400">
              Developed by Arslan Kucukkafa with ⚡️ using Next.js & NextUI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
