import Image from "next/image";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Badge, Calendar, Gamepad, Github, Trophy, Users } from "lucide-react";
import Link from "next/link";




export default async function Home() {
  const session = await auth()

  return (
    <div className="items-center justify-items-center min-h-screen px-8 pb-20 gap-16 sm:p-20 sm:pt-0">
      <main>
        <section className="pb-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r p-2 from-pink-500 to-purple-500 bg-clip-text text-transparent">
                The Ultimate osu! Tournament Platform
              </h1>
              <p className="text-lg md:text-xl text-primary/75 mb-8">
                Create, manage, and participate in osu! tournaments
                with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" disabled>
                  
                  Coming Soon
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={"https://github.com/didcreetsadgoku500/capstone"}>
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <Gamepad className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Centralized Management</h3>
                <p className="text-primary/75 ">
                  Say goodbye to scattered spreadsheets. Manage your entire tournament from one platform.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <Users className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Staff Roles</h3>
                <p className="text-primary/75">
                  Assign specific roles to your staff members and streamline tournament operations.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <Calendar className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tournament Discovery</h3>
                <p className="text-primary/75">
                  Find and join tournaments easily. No more searching through forum posts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Trophy className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Ready to Host Your Tournament?</h2>
              <p className="text-primary/75 mb-8">
                Join a growing community of tournament organizers and players. <br /> Make your next osu! tournament a success with
                tournament.sh
              </p>
              <Button size="lg" disabled>
                  
                  Coming Soon
                </Button>            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
      </footer>
    </div>
  );
}
