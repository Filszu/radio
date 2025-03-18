import Link from "next/link"
import { Github, Twitter, Instagram, Music2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              PartyVote
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Vote for your favourite music at parties and events.</p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="https://partyvote.ciac.me"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Party Voting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">Email: info@partyvote.ciac.me</li>
              <li className="text-gray-600 dark:text-gray-400">Support: support@partyvote.ciac.me</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PartyVote. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Powered by <Music2 className="mx-1 h-4 w-4" /> Vote for ur favourite music
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

