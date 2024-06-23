"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/backoffice/AdminLayout";
import Banner from "@/app/components/Banner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/app/lib/firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const storage = getStorage(app);

const CreateTemplate = () => {
  const { status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (file) {
      const uploadThumbnail = () => {
        const name = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Thumbnail upload is " + progress + "% done");
          },
          (error) => {
            console.error("Thumbnail upload error:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setThumbnailUrl(downloadURL);
              console.log("Thumbnail available at", downloadURL);
            });
          }
        );
      };
      uploadThumbnail();
    }
  }, [file]);

  useEffect(() => {
    if (pdf) {
      const uploadPdf = () => {
        const name = `${new Date().getTime()}_${pdf.name}`;
        const storageRef = ref(storage, `pdfs/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, pdf);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("PDF upload is " + progress + "% done");
          },
          (error) => {
            console.error("PDF upload error:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setPdfUrl(downloadURL);
              console.log("PDF available at", downloadURL);
            });
          }
        );
      };
      uploadPdf();
    }
  }, [pdf]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        thumbnail: thumbnailUrl,
        pdfFile: pdfUrl,
      }),
    });

    if (res.ok) {
      console.log("Template created successfully");
      router.push("/backoffice/templates");
    } else {
      console.error("Failed to create template");
    }
  };

  return (
    <div className="bg-caribbean_blue">
      <Banner title="Create Template" />
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5 text-gray-800">
          Create New Template
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Enter template title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Template
          </button>
        </form>
      </AdminLayout>
    </div>
  );
};

export default CreateTemplate;
