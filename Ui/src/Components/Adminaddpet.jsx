import { useState } from "react";

const Adminaddpet = () => {
  const [toyName, setToyName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Dog"); // Default category state
  const [material, setMaterial] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const resetForm = () => {
    setToyName("");
    setPrice("");
    setCategory("Dog");
    setMaterial("");
    setStatus("In Stock");
    setDescription("");
    setImage(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("toy_name", toyName);
    formData.append("price", price);
    formData.append("category", category); // Appended category field to FormData
    formData.append("material", material);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/add-product",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Product added successfully!");
        resetForm();
      } else {
        alert(data.error || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            🧸 Add Pet Products
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the toy details below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Toy Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Toy Name
            </label>
            <input
              type="text"
              placeholder="Enter toy name"
              value={toyName}
              onChange={(e) => setToyName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Category Dropdown Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Pet Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="Dog">🐶 Dog</option>
              <option value="Cat">🐱 Cat</option>
              <option value="Fish">🐟 Fish</option>
              <option value="Bird">🦜 Bird</option>
              <option value="Small Pet">🐹 Small Pet</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Material */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              Material
            </label>
            <input
              type="text"
              placeholder="Rubber / Cotton / Plastic / Glass"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              Upload Image
            </label>
            <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-gray-50/50">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-44 rounded-lg object-cover"
                />
              ) : (
                <>
                  <div className="text-5xl">📷</div>
                  <p className="text-gray-500 mt-2">
                    Click to upload image
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
                required
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition"
            >
              + Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Adminaddpet;