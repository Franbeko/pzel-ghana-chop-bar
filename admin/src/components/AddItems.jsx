import { useState } from "react";
import { styles } from "../assets/dummyadmin";
import { FiHeart, FiStar, FiUpload } from "react-icons/fi";
import { Coin } from "phosphor-react";
import axios from "axios";

//Use env var — defaults to 127.0.0.1 (IPv4) instead of localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000';

const AddItems = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categories: [],
    priceLRD: '',
    priceUSD: '',
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: ''
  });
  const [categories] = useState([
    'Daily Specials (Mon-Sat)',
    'Sunday Specials',
    'Rice Dishes',
    'Drinks'
  ]);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const alreadySelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: alreadySelected
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      };
    });
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }))
    }
  }

  const handleRating = rating => setFormData(prev => ({ ...prev, rating }));

  const handleHearts = () => setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      alert('Please select at least one category.');
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'preview') return;
        if (key === 'categories') {
          val.forEach(cat => payload.append('categories', cat));
          return;
        }
        payload.append(key, val);
      });

      // Full absolute URL — bypasses Vite proxy entirely
      const res = await axios.post(
        `${API_URL}/api/items`,
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Item added successfully:', res.data);

      setFormData({
        name: '',
        description: '',
        categories: [],
        priceLRD: '',
        priceUSD: '',
        rating: 0,
        hearts: 0,
        total: 0,
        image: null,
        preview: ''
      });
      alert('Item added successfully!');
    }
    catch (err) {
      // Show the real error from the backend
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unknown error';
      console.error('Error uploading item:', {
        status: err.response?.status,
        message: backendMessage,
        data: err.response?.data,
      });
      alert(`Failed to add item:\n\n${backendMessage}`);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className='max-w-4xl mx-auto'>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Items</h2>

          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <div className={styles.uploadWrapper}>
              <label className={styles.uploadLabel}>
                {formData.preview ? (
                  <img src={formData.preview} alt="Preview" className={styles.previewImage} />
                ) : (
                  <div className="text-center p-4">
                    <FiUpload className={styles.uploadIcon} />
                    <p className={styles.uploadText}>Click to upload menu image</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" required />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Menu Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Enter Menu Name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Menu Description"
                rows="4"
                className={styles.inputField}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">
                  Categories <span className="text-xs text-amber-200/60">(select one or more)</span>
                </label>
                <div className="space-y-2 bg-[#3a2b2b] border border-amber-500/30 rounded-lg p-3">
                  {categories.map(c => {
                    const checked = formData.categories.includes(c);
                    return (
                      <label
                        key={c}
                        className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md transition-colors ${
                          checked ? 'bg-amber-500/20 border border-amber-500/50' : 'hover:bg-amber-500/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCategoryToggle(c)}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                        <span className="text-amber-100 text-sm sm:text-base">{c}</span>
                      </label>
                    );
                  })}
                </div>
                {formData.categories.length > 0 && (
                  <p className="mt-2 text-xs text-amber-300/80">
                    Selected: {formData.categories.join(', ')}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Price (LRD)</label>
                <div className="relative">
                  <Coin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-xl" />
                  <input
                    type="number"
                    name="priceLRD"
                    value={formData.priceLRD}
                    onChange={handleInputChange}
                    className={styles.inputField + ' pl-10 sm:pl-12'}
                    placeholder="Enter price in LRD"
                    min='0'
                    step='0.01'
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Price (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-xl">$</span>
                <input
                  type="number"
                  name="priceUSD"
                  value={formData.priceUSD}
                  onChange={handleInputChange}
                  className={styles.inputField + ' pl-10 sm:pl-12'}
                  placeholder="Enter price in USD"
                  min='0'
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className={styles.gridTwoCols}>
              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl sm:text-3xl transition-transform hover:scale-110"
                    >
                      <FiStar className={
                        star <= (hoverRating || formData.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-amber-100/30'
                      } />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Popularity</label>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleHearts}
                    className="text-2xl sm:text-3xl text-amber-400 hover:text-amber-300 transition-colors animate-pulse"
                  >
                    <FiHeart />
                  </button>
                  <input
                    type="number"
                    name="hearts"
                    value={formData.hearts}
                    onChange={handleInputChange}
                    className={styles.inputField + ' pl-10 sm:pl-12 '}
                    placeholder="Enter Likes"
                    min='0'
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.actionBtn}>
              Add To Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItems