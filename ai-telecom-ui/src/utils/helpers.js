// Utility functions for the Telecom Operations Dashboard

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Get priority icon based on priority level
 */
export const getPriorityIcon = (priority) => {
  const icons = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢',
  };
  return icons[priority] || '⚪';
};

/**
 * Get category icon based on ticket category
 */
export const getCategoryIcon = (category) => {
  const icons = {
    network: '📡',
    performance: '⚡',
    infrastructure: '🏗️',
    voice: '📞',
    data: '📊',
    power: '🔋',
    spectrum: '📻',
    roaming: '✈️',
  };
  return icons[category] || '📋';
};

/**
 * Calculate AI confidence color
 */
export const getConfidenceColor = (confidence) => {
  if (confidence >= 90) return 'success';
  if (confidence >= 75) return 'info';
  if (confidence >= 60) return 'warning';
  return 'error';
};

/**
 * Filter tickets by search term
 */
export const filterTickets = (tickets, searchTerm) => {
  if (!searchTerm) return tickets;
  
  const term = searchTerm.toLowerCase();
  return tickets.filter(ticket => 
    ticket.id.toLowerCase().includes(term) ||
    ticket.title.toLowerCase().includes(term) ||
    ticket.description.toLowerCase().includes(term) ||
    ticket.location.toLowerCase().includes(term) ||
    ticket.assignee.toLowerCase().includes(term)
  );
};

/**
 * Sort tickets by various criteria
 */
export const sortTickets = (tickets, sortBy) => {
  const sorted = [...tickets];
  
  switch (sortBy) {
    case 'priority':
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    
    case 'date':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    case 'impact':
      return sorted.sort((a, b) => b.impactedCustomers - a.impactedCustomers);
    
    case 'confidence':
      return sorted.sort((a, b) => b.aiConfidence - a.aiConfidence);
    
    default:
      return sorted;
  }
};

/**
 * Get status badge props
 */
export const getStatusBadge = (status) => {
  const badges = {
    pending_ai_analysis: { label: 'AI Processing', color: 'warning', icon: '⏳' },
    ai_approved: { label: 'AI Approved', color: 'success', icon: '✓' },
    ai_rejected: { label: 'AI Rejected', color: 'error', icon: '✗' },
    pending_approval: { label: 'Pending Approval', color: 'info', icon: '⏸' },
    approved: { label: 'Approved', color: 'success', icon: '✓' },
    rejected: { label: 'Rejected', color: 'error', icon: '✗' },
  };
  return badges[status] || { label: status, color: 'default', icon: '•' };
};
