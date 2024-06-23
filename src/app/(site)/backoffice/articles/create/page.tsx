"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/backoffice/AdminLayout";
import RichTextEditor from "@/app/components/backoffice/RichTextEditor";
import Banner from "@/app/components/Banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/app/lib/firebase";
const storage = getStorage(app);

const CreateArticle = () => {
  const { status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const upload = () => {
      const name = `${new Date().getTime()}_${title}`;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file!);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.error(
                "User doesn't have permission to access the object"
              );
              break;
            case "storage/canceled":
              console.error("User canceled the upload");
              break;
            case "storage/unknown":
              console.error(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setThumbnailUrl(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    };
    if (file) {
      upload();
    }
  }, [file, title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        thumbnail: thumbnailUrl,
        content,
      }),
    });

    if (res.ok) {
      console.log("Article created successfully");
      router.push("/backoffice/articles");
    } else {
      console.error("Failed to create article");
    }
  };

  return (
    <div className="bg-caribbean_blue">
      <Banner title="Create Article"></Banner>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5 text-gray-800">
          Create New Article
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
              placeholder="Enter article title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Enter article description"
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
              onChange={(e) => setFile(e.target.files![0])}
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Article
          </button>
        </form>
      </AdminLayout>
    </div>
  );
};

export default CreateArticle;
