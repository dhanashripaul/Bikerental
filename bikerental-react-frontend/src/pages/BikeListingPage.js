import React, { useState, useEffect } from 'react';
import { vehicleService, brandService } from '../services/apiService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiFilter, FiDollarSign, FiFeather } from 'react-icons/fi';

const BikeListingPage = () => {
  const [bikes, setBikes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bikesRes, brandsRes] = await Promise.all([
        vehicleService.getAllVehicles(),
        brandService.getAllBrands(),
      ]);
      setBikes(bikesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      toast.error('Failed to load bikes');
    } finally {
      setLoading(false);
    }
  };

  let filteredBikes = bikes;

  if (filterBrand) {
    filteredBikes = filteredBikes.filter(bike => bike.vehiclesBrand === parseInt(filterBrand));
  }

  if (filterFuel) {
    filteredBikes = filteredBikes.filter(bike => bike.fuelType === filterFuel);
  }

  if (sortBy === 'price-low') {
    filteredBikes = [...filteredBikes].sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sortBy === 'price-high') {
    filteredBikes = [...filteredBikes].sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (sortBy === 'name') {
    filteredBikes = [...filteredBikes].sort((a, b) => a.vehiclesTitle.localeCompare(b.vehiclesTitle));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Bikes</h1>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter size={20} />
          <h2 className="text-xl font-bold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">Brand</label>
            <select
              className="form-select"
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Fuel Type</label>
            <select
              className="form-select"
              value={filterFuel}
              onChange={(e) => setFilterFuel(e.target.value)}
            >
              <option value="">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterBrand('');
                setFilterFuel('');
                setSortBy('');
              }}
              className="w-full btn btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bikes Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading bikes...</p>
        </div>
      ) : filteredBikes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No bikes found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBikes.map(bike => (
            <Link
              key={bike.id}
              to={`/bikes/${bike.id}`}
              className="vehicle-card hover:shadow-xl transition-shadow"
            >
              <img
                src={bike.vimage1 || 'https://via.placeholder.com/300x200?text=Bike'}
                alt={bike.vehiclesTitle}
                className="w-full h-48 object-cover"
              />
              <div className="vehicle-info">
                <h3 className="font-bold text-lg mb-1">{bike.vehiclesTitle}</h3>
                <p className="text-gray-600 text-sm mb-3">{bike.modelYear}</p>
                <div className="flex items-center gap-2 mb-2">
                  <FiDollarSign size={16} />
                  <span className="font-bold text-blue-600">${bike.pricePerDay}/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiFeather size={16} />
                  <span className="text-sm text-gray-600">{bike.fuelType}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BikeListingPage;
