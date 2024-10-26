import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'fds', companyTags: 'Tech', email: 'fds@example.com', phone: '75370 00123', tags: 'VIP', createdDate: '2023-10-29' },
    { id: 2, name: 'sanyam', companyTags: 'Finance', email: 'sanyam@example.com', phone: '87997 18458', tags: 'New', createdDate: '2023-10-20' },
  ]);

  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    companyTags: '',
    email: '',
    tags: '',
    createdDate: '',
  });

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    tags: '',
    companyTags: '',
    marketingOptIn: false,
  });

  const [showForm, setShowForm] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      phone: '',
      companyTags: '',
      email: '',
      tags: '',
      createdDate: '',
    });
  };

  const handleNewContactChange = (field, value) => {
    setNewContact(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    const newContactData = {
      id: contacts.length + 1,
      ...newContact,
      createdDate: currentDate,
    };
    setContacts(prev => [...prev, newContactData]);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      tags: '',
      companyTags: '',
      marketingOptIn: false,
    });
    setShowForm(false);
  };

  const filteredContacts = contacts.filter(contact => {
    return Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return contact[key]?.toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex gap-4">
          <Button onClick={() => setShowForm(true)}>Create Contact</Button>
          <Button variant="outline">Export</Button>
          <Button variant="outline">Import</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Input 
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <Input 
          placeholder="Filter by company tags"
          value={filters.companyTags}
          onChange={(e) => handleFilterChange('companyTags', e.target.value)}
        />
        <Input 
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
        <Input 
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={(e) => handleFilterChange('phone', e.target.value)}
        />
        <Input 
          placeholder="Filter by tags"
          value={filters.tags}
          onChange={(e) => handleFilterChange('tags', e.target.value)}
        />
        <Input 
          placeholder="Filter by created date"
          value={filters.createdDate}
          onChange={(e) => handleFilterChange('createdDate', e.target.value)}
        />
      </div>

      {filters.name || filters.phone || filters.companyTags || filters.email || filters.tags || filters.createdDate ? (
        <Button 
          variant="ghost" 
          className="mb-4 text-sm"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" /> Clear Filters
        </Button>
      ) : null}

      {/* Contact Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 p-4"><Checkbox /></th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Company Tags</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Tags</th>
              <th className="text-left p-4">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-t">
                <td className="p-4"><Checkbox /></td>
                <td className="p-4">{contact.name}</td>
                <td className="p-4">{contact.companyTags}</td>
                <td className="p-4">{contact.email}</td>
                <td className="p-4">{contact.phone}</td>
                <td className="p-4">{contact.tags}</td>
                <td className="p-4">{contact.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Contact Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Create Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Enter the name"
                value={newContact.name}
                onChange={(e) => handleNewContactChange('name', e.target.value)}
                required
              />
              <Input
                placeholder="Enter phone number"
                value={newContact.phone}
                onChange={(e) => handleNewContactChange('phone', e.target.value)}
                required
              />
              <Input
                placeholder="Enter email"
                type="email"
                value={newContact.email}
                onChange={(e) => handleNewContactChange('email', e.target.value)}
                required
              />
              <Input
                placeholder="Contact Tag"
                value={newContact.tags}
                onChange={(e) => handleNewContactChange('tags', e.target.value)}
              />
              <Input
                placeholder="Company Tag"
                value={newContact.companyTags}
                onChange={(e) => handleNewContactChange('companyTags', e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={newContact.marketingOptIn}
                  onCheckedChange={(checked) => handleNewContactChange('marketingOptIn', checked)}
                />
                <label htmlFor="marketing" className="text-sm text-gray-600">
                  You agree to receive marketing communications from us.
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;