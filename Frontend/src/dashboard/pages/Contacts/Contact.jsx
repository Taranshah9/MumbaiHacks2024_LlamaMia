import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CropsTable from './CropsTable';
// import { crop } from 'data';
import {cropdata} from "../../../../data.js"
export const FarmAnalytics = () => {
  const [crops, setCrops] = useState(cropdata);

  const [filters, setFilters] = useState({
    cropName: '',
    minRevenue: '',
    maxRevenue: '',
    minQuantity: '',
    maxQuantity: '',
  });

  const [newCrop, setNewCrop] = useState({
    crop: {
      name: '',
      qnt: ''
    },
    sold_at: '',
    expense: {
      seeds: '',
      fertilizers: [{ name: '', cost: '' }],
      electricity: '',
      machinery: '',
      labor: '',
      water_usage: '',
      storage: '',
      transport: '',
      pesticides: [{ name: '', cost: '' }]
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const calculateTotalExpense = (expense) => {
    const fertilizerCost = expense.fertilizers.reduce((acc, curr) => acc + Number(curr.cost), 0);
    const pesticideCost = expense.pesticides.reduce((acc, curr) => acc + Number(curr.cost), 0);
    return Number(expense.seeds) + fertilizerCost + Number(expense.electricity) + Number(expense.machinery) + 
           Number(expense.labor) + Number(expense.water_usage) + Number(expense.storage) + Number(expense.transport) + pesticideCost;
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      cropName: '',
      minRevenue: '',
      maxRevenue: '',
      minQuantity: '',
      maxQuantity: '',
    });
  };

  const handleNewCropChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewCrop(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewCrop(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleExpenseChange = (field, value) => {
    setNewCrop(prev => ({
      ...prev,
      expense: {
        ...prev.expense,
        [field]: value
      }
    }));
  };

  const handleAddFertilizer = () => {
    setNewCrop(prev => ({
      ...prev,
      expense: {
        ...prev.expense,
        fertilizers: [...prev.expense.fertilizers, { name: '', cost: '' }]
      }
    }));
  };

  const handleAddPesticide = () => {
    setNewCrop(prev => ({
      ...prev,
      expense: {
        ...prev.expense,
        pesticides: [...prev.expense.pesticides, { name: '', cost: '' }]
      }
    }));
  };

  const handleFertilizerChange = (index, field, value) => {
    setNewCrop(prev => ({
      ...prev,
      expense: {
        ...prev.expense,
        fertilizers: prev.expense.fertilizers.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handlePesticideChange = (index, field, value) => {
    setNewCrop(prev => ({
      ...prev,
      expense: {
        ...prev.expense,
        pesticides: prev.expense.pesticides.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleSubmit = () => {
    setCrops(prev => [...prev, {
      ...newCrop,
      sold_at: Number(newCrop.sold_at),
      expense: {
        ...newCrop.expense,
        seeds: Number(newCrop.expense.seeds),
        electricity: Number(newCrop.expense.electricity),
        machinery: Number(newCrop.expense.machinery),
        labor: Number(newCrop.expense.labor),
        water_usage: Number(newCrop.expense.water_usage),
        storage: Number(newCrop.expense.storage),
        transport: Number(newCrop.expense.transport)
      }
    }]);
    setIsOpen(false);
    setNewCrop({
      crop: { name: '', qnt: '' },
      sold_at: '',
      expense: {
        seeds: '',
        fertilizers: [{ name: '', cost: '' }],
        electricity: '',
        machinery: '',
        labor: '',
        water_usage: '',
        storage: '',
        transport: '',
        pesticides: [{ name: '', cost: '' }]
      }
    });
  };

  const filteredCrops = crops.filter(crop => {
    const revenue = crop.sold_at * parseInt(crop.crop.qnt);
    return (
      (!filters.cropName || crop.crop.name.toLowerCase().includes(filters.cropName.toLowerCase())) &&
      (!filters.minRevenue || revenue >= parseFloat(filters.minRevenue)) &&
      (!filters.maxRevenue || revenue <= parseFloat(filters.maxRevenue)) &&
      (!filters.minQuantity || parseInt(crop.crop.qnt) >= parseFloat(filters.minQuantity)) &&
      (!filters.maxQuantity || parseInt(crop.crop.qnt) <= parseFloat(filters.maxQuantity))
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Farm Analytics</h1>
        <div className="flex gap-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" /> Add Crop
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Crop</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cropName">Crop Name</Label>
                    <Input
                      id="cropName"
                      value={newCrop.crop.name}
                      onChange={(e) => handleNewCropChange('crop.name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newCrop.crop.qnt}
                      onChange={(e) => handleNewCropChange('crop.qnt', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="soldAt">Sold At (per unit)</Label>
                  <Input
                    id="soldAt"
                    type="number"
                    value={newCrop.sold_at}
                    onChange={(e) => handleNewCropChange('sold_at', e.target.value)}
                  />
                </div>

                <h3 className="text-lg font-semibold mt-4">Expenses</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seeds">Seeds</Label>
                    <Input
                      id="seeds"
                      type="number"
                      value={newCrop.expense.seeds}
                      onChange={(e) => handleExpenseChange('seeds', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="electricity">Electricity</Label>
                    <Input
                      id="electricity"
                      type="number"
                      value={newCrop.expense.electricity}
                      onChange={(e) => handleExpenseChange('electricity', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="machinery">Machinery</Label>
                    <Input
                      id="machinery"
                      type="number"
                      value={newCrop.expense.machinery}
                      onChange={(e) => handleExpenseChange('machinery', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="labor">Labor</Label>
                    <Input
                      id="labor"
                      type="number"
                      value={newCrop.expense.labor}
                      onChange={(e) => handleExpenseChange('labor', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="water">Water Usage</Label>
                    <Input
                      id="water"
                      type="number"
                      value={newCrop.expense.water_usage}
                      onChange={(e) => handleExpenseChange('water_usage', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="storage">Storage</Label>
                    <Input
                      id="storage"
                      type="number"
                      value={newCrop.expense.storage}
                      onChange={(e) => handleExpenseChange('storage', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="transport">Transport</Label>
                  <Input
                    id="transport"
                    type="number"
                    value={newCrop.expense.transport}
                    onChange={(e) => handleExpenseChange('transport', e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Fertilizers</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddFertilizer}>
                      Add Fertilizer
                    </Button>
                  </div>
                  {newCrop.expense.fertilizers.map((fertilizer, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Fertilizer name"
                        value={fertilizer.name}
                        onChange={(e) => handleFertilizerChange(index, 'name', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Cost"
                        value={fertilizer.cost}
                        onChange={(e) => handleFertilizerChange(index, 'cost', e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Pesticides</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddPesticide}>
                      Add Pesticide
                    </Button>
                  </div>
                  {newCrop.expense.pesticides.map((pesticide, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Pesticide name"
                        value={pesticide.name}
                        onChange={(e) => handlePesticideChange(index, 'name', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Cost"
                        value={pesticide.cost}
                        onChange={(e) => handlePesticideChange(index, 'cost', e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <Button type="button" onClick={handleSubmit}>Add Crop</Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* <Button variant="outline">Export Data</Button>
          <Button variant="outline">Generate Report</Button> */}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Input 
          placeholder="Filter by crop name"
          value={filters.cropName}
          onChange={(e) => handleFilterChange('cropName', e.target.value)}
        />
        <Input 
          placeholder="Min Revenue"
          type="number"
          value={filters.minRevenue}
          onChange={(e) => handleFilterChange('minRevenue', e.target.value)}
        />
        <Input 
          placeholder="Max Revenue"
          type="number"
          value={filters.maxRevenue}
          onChange={(e) => handleFilterChange('maxRevenue', e.target.value)}
        />
        <Input 
          placeholder="Min Quantity"
          type="number"
          value={filters.minQuantity}
          onChange={(e) => handleFilterChange('minQuantity', e.target.value)}
        />
        <Input 
          placeholder="Max Quantity"
          type="number"
          value={filters.maxQuantity}
          onChange={(e) => handleFilterChange('maxQuantity', e.target.value)}
        />
      </div>

      {Object.values(filters).some(filter => filter) && (
        <Button 
          variant="ghost" 
          className="mb-4 text-sm"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" /> Clear Filters
        </Button>
      )}

      {/* Crops Table */}
      <CropsTable crops={filteredCrops} />
      </div>)} ; 