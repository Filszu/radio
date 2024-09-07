import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUser } from "@/lib/auth/getUser";
import Link from "next/link";
// import { UserParties } from "./user-parties"
import { redirect } from "next/navigation";
// Mock user data


export default async function UserProfile() {

const user = await getUser();

if (!user) {
    redirect('/login');
}


console.log('user', user);

const userProfile = {
    name: user.user_metadata.full_name,
    username: "@alice_j",
    bio: "Music lover | Party enthusiast | Always up for a good time!",
    avatar: user.user_metadata.avatar_url,
    followers: 0,
    following: 0,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.username}</CardDescription>
            <p className="mt-2 text-muted-foreground">{userProfile.bio}</p>
            <div className="mt-4 flex justify-center sm:justify-start gap-4">
              <div>
                <span className="font-bold">{userProfile.followers}</span> Followers
              </div>
              <div>
                <span className="font-bold">{userProfile.following}</span> Following
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">My Parties</h2>
          {/* <UserParties /> */}
          <Link href="/new-party">
          <Button>Create Party</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  )
}