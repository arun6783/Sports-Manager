import React from 'react'

const TierList = ({ tiers, onEdit, onDelete }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Defined Tiers</h5>
      </div>
      <div className="card-body">
        {tiers.length === 0 ? (
          <p>No tiers added yet. Click "Manage Tiers" to add new tiers.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, index) => (
                <tr key={index}>
                  <td>{tier.name}</td>
                  <td>{tier.description || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default TierList
