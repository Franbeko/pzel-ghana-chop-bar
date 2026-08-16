import { useState } from "react";
import { styles } from "../assets/dummyadmin";
import { FiHeart, FiStar, FiUpload } from "react-icons/fi";
import { Coin } from "phosphor-react";
import axios from "axios"

const AddItems = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
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
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'preview') return;
        payload.append(key, val);
      });

      // ✅ UPDATED: Changed to relative path
      await axios.post(
        '/api/items',
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      setFormData({
        name: '',
        description: '',
        category: '',
        priceLRD: '',
        priceUSD: '',
        rating: 0,
        hearts: 0,
        total: 0,
        image: null,
        preview: ''
      })
      alert('Item added successfully!');
    }
    catch (err) {
      console.error('Error uploading items:', err.response || err.message);
      alert('Failed to add item. Please try again.');
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
                <label className="block mb-2 text-base sm:text-lg text-amber-400 font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c} value={c} className="bg-[#3a2b2b]">{c}</option>
                  ))}
                </select>
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