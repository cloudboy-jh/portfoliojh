"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, FileDown } from 'lucide-react'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'

export interface Project {
  id: string
  name: string
  url: string
}

interface ProjectListProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  const exportToPDF = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [['Project Name', 'URL']],
      body: projects.map(project => [project.name, project.url]),
    })
    doc.save('projects.pdf')
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {project.url}
                </a>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(project)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit project</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete project</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={exportToPDF}>
          <FileDown className="mr-2 h-4 w-4" />
          Export to PDF
        </Button>
      </div>
    </div>
  )
}

