import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function AuthHeader() {
  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 bg-white/10 backdrop-blur-md text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 hover:bg-white/20 transition-all duration-200">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "bg-white/95 backdrop-blur-md border border-white/20",
                  userButtonPopoverActions: "bg-white/95"
                }
              }}
            />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}