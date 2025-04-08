"use client";

import { StudentProps } from "@/interfaces";
import { useEffect, useState } from "react";

export const useStudents = () => {
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setStudents(result);
    } catch (error) {
      setError("Failed to fetch students because of an API error.");
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, setError, fetchStudents };
};

export const useStudentById = (id: string) => {
  const [student, setStudent] = useState<StudentProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setStudent(result);
    } catch (error) {
      setError("Failed to fetch student because of an API error.");
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  return { student, loading, error };
};

export const createStudent = async (
  student: StudentProps
): Promise<{ error: string | null }> => {
  try {
    const response = await fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { error: null };
  } catch (error) {
    console.error("Error creating student:", error);
    return { error: "Failed to create student because of an API error." };
  }
};

export const editStudent = async (
  id: string,
  updatedStudent: Partial<StudentProps>
): Promise<{ error: string | null }> => {
  try {
    const response = await fetch(`http://localhost:8080/api/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { error: null };
  } catch (error) {
    console.error("Error editing student:", error);
    return { error: "Failed to edit student due to an API error." };
  }
};

export const deleteStudent = async (
  id: string
): Promise<{ error: string | null }> => {
  try {
    const response = await fetch(`http://localhost:8080/api/students/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { error: null };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { error: "Failed to delete student due to an API error." };
  }
};
