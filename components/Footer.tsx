import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="text-center w-full my-10">
            <h3>
                Created with ❣️ by{' '}
                <Link
                    href="https://lessons.ciac.me/"
                    className="link-underline text-primary hover:text-primary-dark transition-colors"
                >
                    Filszu
                </Link>{' '}
                2023 - 2025
            </h3>
            <h3 className="mt-2">
                Give a ⭐ on{' '}
                <Link
                    href="https://github.com/Filszu/radio"
                    className="link-underline text-primary hover:text-primary-dark transition-colors"
                >
                    Github repo
                </Link>
            </h3>
            <div className="mt-4 space-x-4">
                <Link
                    href="https://github.com/Filszu/radio"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                    target='_blank'
                >
                    Documentation
                </Link>
                <Link
                    href="docs/privacy-policy"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Privacy Policy
                </Link>
                <Link
                    href="/docs/terms-of-service"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Terms of Service
                </Link>
                <Link
                    href="/docs"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Useful Links
                </Link>
            </div>
        </footer>
    );
};

export default Footer;