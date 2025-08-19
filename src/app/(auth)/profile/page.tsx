"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

// Firebase
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Loader2 } from 'lucide-react'

export default function UserProfile() {
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  // Listen to user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)

        const userRef = doc(db, "users", firebaseUser.uid)
        const snap = await getDoc(userRef)

        if (snap.exists()) {
          setProfile(snap.data())
        } else {
          const defaultProfile = {
            fullname: firebaseUser.displayName || "",
            email: firebaseUser.email,
            phone: "",
            birthdate: "",
            bio: "",
            profile_pic: firebaseUser.photoURL || "",
          }
          await setDoc(userRef, defaultProfile)
          setProfile(defaultProfile)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!user || !profile) return
    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, profile, { merge: true })
    setEditing(false)
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
        <Loader2 className='animate-spin'/>
      </div>
    )
  }

  return (
    <>
      <Header />

      <Card className="max-w-lg mx-auto p-6 shadow-lg rounded-2xl my-16">
        <CardHeader>
          <CardTitle className="text-xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4 relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.profile_pic || ""} />
              <AvatarFallback>
                {profile.fullname ? profile.fullname.charAt(0) : "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">
                {profile.fullname || "Unnamed User"}
              </h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          {/* Editable section */}
          {editing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={profile.fullname || ""}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email (read-only)</Label>
                <Input
                  id="email"
                  name="email"
                  value={profile.email || ""}
                  disabled
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  value={profile.birthdate || ""}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="profile_pic">Profile Picture URL</Label>
                <Input
                  id="profile_pic"
                  name="profile_pic"
                  value={profile.profile_pic || ""}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>Phone</Label>
                <p className="text-sm mt-1">{profile.phone || "Not provided"}</p>
              </div>
              <div>
                <Label>Birthdate</Label>
                <p className="text-sm mt-1">{profile.birthdate || "Not provided"}</p>
              </div>
              <div>
                <Label>Bio</Label>
                <p className="text-sm mt-1">{profile.bio || "No bio provided"}</p>
              </div>
              <Button onClick={() => setEditing(true)} variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Footer />
    </>
  )
}
