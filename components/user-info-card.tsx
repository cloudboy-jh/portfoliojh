"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export interface UserInfo {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl: string
}

interface UserInfoCardProps {
  user: UserInfo
  onUpdate: (updatedUser: UserInfo) => void
}

export function UserInfoCard({ user, onUpdate }: UserInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null)

  // Cleanup temporary URL when component unmounts
  useEffect(() => {
    return () => {
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl)
      }
    }
  }, [tempAvatarUrl])

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Revoke previous temporary URL if it exists
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl)
      }
      // Create new temporary URL
      const newTempUrl = URL.createObjectURL(file)
      setTempAvatarUrl(newTempUrl)
      setEditedUser({ ...editedUser, avatarUrl: newTempUrl })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedUser)
    setIsEditing(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage 
            src={tempAvatarUrl || user.avatarUrl} 
            alt={user.name} 
          />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{user.bio}</p>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  value={editedUser.avatarUrl}
                  onChange={(e) => setEditedUser({ ...editedUser, avatarUrl: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="avatar">Avatar Image</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleAvatarUpload}
                  className="cursor-pointer"
                />
                {tempAvatarUrl && (
                  <div className="mt-2">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={tempAvatarUrl} alt="Preview" />
                      <AvatarFallback>{editedUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

