"use client"

import { useState } from "react"
import { UserInfoCard, UserInfo } from '@/components/user-info-card'
import { ProjectList, Project } from '@/components/project-list'
import { ProjectForm } from '@/components/project-form'
import ThemeToggle from '@/components/theme-toggle'
import ThemeProvider from "@/components/theme-provider"
import Image from 'next/image'
import portfolioIcon from '../app/assets/portfolioicon.png'

export default function Home() {
  const [user, setUser] = useState<UserInfo>({
    id: "1",
    name: "John Doe",
    role: "Full Stack Developer",
    bio: "Passionate about creating elegant solutions to complex problems.",
    avatarUrl: "/placeholder.svg?height=100&width=100"
  })

  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Project 1", url: "https://project1.com" },
    { id: "2", name: "Project 2", url: "https://project2.com" },
    { id: "3", name: "Project 3", url: "https://project3.com" },
  ])

  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleUpdateUser = (updatedUser: UserInfo) => {
    setUser(updatedUser)
  }

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    setProjects([...projects, { ...newProject, id: Date.now().toString() }])
  }

  const handleEditProject = (updatedProject: Omit<Project, 'id'>) => {
    setProjects(projects.map(p => p.id === editingProject?.id ? { ...updatedProject, id: p.id } : p))
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6 sm:space-y-8">
          <div className="flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-2">
            <Image
              src={portfolioIcon}
              alt="Portfolio Icon"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <ThemeToggle />
          </div>
          <UserInfoCard user={user} onUpdate={handleUpdateUser} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <ProjectForm onSubmit={handleAddProject} />
          </div>
          <ProjectList 
            projects={projects} 
            onEdit={setEditingProject}
            onDelete={handleDeleteProject}
          />
          {editingProject && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-background border rounded-lg p-4 w-full max-w-md">
                <ProjectForm 
                  project={editingProject} 
                  onSubmit={handleEditProject} 
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </ThemeProvider>
  )
}

