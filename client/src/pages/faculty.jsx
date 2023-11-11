import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Faculty() {
  const [getDeadlineError, setGetDeadlineError] = useState(false);
  const navigate = useNavigate();
  const [proposalDeadline, setDeadline] = useState([]);
  const {currentUser}=useSelector((state)=>state.user);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [getProposalError, setProposalError] = useState(false);
  const [proposalData, setProposalData] = useState([]);
  const [updatedProposals, setUpdatedProposals] = useState([]);
  const [formData, setFormData] = useState({
    name:'',
    description: '',
    status: 'Requested',
    reason: '',
    budget: 1,
    unitPrice: 1,
    quantity: 1,
  });
  const handleDeadline = async () => {
    try {
      setGetDeadlineError(false);
      const res = await fetch('/api/deadline/getDeadline');
      const data = await res.json();
      if (data.success === false) {
        setGetDeadlineError(data);
        return;
      }
      setDeadline(data);
    } catch (error) {
      setGetDeadlineError(true);
    }
  };
  const ReqProp = async () => {
    try {
      const currDate = new Date();
      currDate.setDate(currDate.getDate() + 60);
      const deadlineDate = (currDate.getFullYear())+"-"+(currDate.getMonth()+1)+"-"+(currDate.getDate());
      const res = await fetch('/api/deadline/setDeadline',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deadlinetype: 'request',
          date: deadlineDate,
          requestflag: true
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      window.location.reload(false);
      console.log(data.message);
    } 
    catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  //console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/proposal/uploadProposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: currentUser.email,
          name: currentUser.name,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      window.location.reload(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getProposal = async () => {
    try {
      setProposalError(false);
      //const res = await fetch('/api/proposal/getProposal');
      const { email } = currentUser;
      // Include email as a query parameter in the URL
      const queryParams = new URLSearchParams({
        email,
      });
      const res = await fetch(`/api/proposal/getProposal?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success === false) {
        setProposalError(data);
        return;
      }
      setProposalData(data);
    } catch (error) {
      setProposalError(true);
    }
  };

  useEffect(() => {
    handleDeadline();
  }, []);
  useEffect(() => {
    getProposal();
  }, []);
  const currDate = new Date();
  const today = (currDate.getFullYear())+"-"+(currDate.getMonth()+1)+"-"+(currDate.getDate());
  var showReqPropFlag=(getDeadlineError && getDeadlineError.statusCode===404);
  //showReqPropFlag=true;
  //console.log(showReqPropFlag);

  const handleAccept = (key) => {
    // Implement logic for accepting the proposal with the specified key
    // For now, let's just update the status to 'accepted'
    const updatedProposal = { ...proposalData[key], status: 'accepted' };
    const updatedProposalsCopy = [...updatedProposals, updatedProposal];
    setUpdatedProposals(updatedProposalsCopy);
  };

  const handleReject = (key) => {
    // Implement logic for rejecting the proposal with the specified key
    // For now, let's just update the status to 'rejected'
    const updatedProposal = { ...proposalData[key], status: 'rejected' };
    const updatedProposalsCopy = [...updatedProposals, updatedProposal];
    setUpdatedProposals(updatedProposalsCopy);
  };

  return (
    <>
    <div className='flow-root p-2'>
      {/*start:Request for proposal for program coordinator*/}
      {/*department to be changed to other value */}
      {currentUser.usertype==='coordinator'?
        <>
          {showReqPropFlag ? 
            <>
              <h1 className='text-3xl font-semibold text-center'>Request for Proposal</h1>
              <button onClick={ReqProp} className='bg-blue-900 text-white rounded-lg p-3 hover:opacity-90 gap-4 max-w-xs float-right'>Request Proposal</button>
            </>
          : ''}
        {proposalDeadline.date<=today ? <p>update deadline</p> : '' } 
        </>
      :''}
      {/*End:Request for proposal for program coordinator*/}

      {/*start:Request for proposal for program coordinator*/}
      {currentUser.usertype==='department'?
        <div className='p-3 max-w-4xl mx-auto'>
          <h1 className='text-3xl font-semibold text-center my-7'>
            Submit Proposal
          </h1>
        { showReqPropFlag===false?
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-2 '>
            <input type='text' onChange={handleChange} placeholder='Item' id='description' className='border p-3 rounded-lg' value={formData.description}/>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <p>Quantity</p>
              <input type='number' onChange={handleChange} id='quantity' min='1' required className='p-3 border border-gray-300 rounded-lg' value={formData.quantity}/>
              <p>Unit Price</p>
              <input type='number' onChange={handleChange} id='unitPrice' min='1' required className='p-3 border border-gray-300 rounded-lg' value={formData.unitPrice}/>
            </div>            
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
      :''}
        </div>
      :''
      }
      {/*End:Request for proposal for program coordinator*/}

      {/*Start: Requested proposal for faculty user */}
      {currentUser.usertype==='department' && !showReqPropFlag?
        <div >
          <h1 className='bg-slate-300 mx-2 gap-4 flow-root p-3 '>Submitted Proposal</h1>
          <table className='min-w-mid  bg-slate-100 border border-slate-200 mx-2 mt-4 transform translate-x-1/4'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Quantity</th>
                <th className='py-2 px-4'>Unit Price</th>
                <th className='py-2 px-4'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {proposalData.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.description}</td>
                  <td className='py-2 px-4'>{val.quantity}</td>
                  <td className='py-2 px-4'>{val.unitPrice}</td>
                  <td className='py-2 px-4'>{val.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>:''
      }
      {/*End: Requested table for faculty user */}

      {/*Start: Requested table for coordinator user */}
      {currentUser.usertype==='coordinator' && !showReqPropFlag?
        <div >
          <h1 className='bg-slate-300 mx-2 gap-4 flow-root p-3 '>Submitted Proposal</h1>
          <table className='min-w-mid bg-slate-100 border border-slate-200 mx-2 mt-4 transform translate-x-1/4'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Quantity</th>
                <th className='py-2 px-4'>Unit Price</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {proposalData.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.description}</td>
                  <td className='py-2 px-4'>{val.quantity}</td>
                  <td className='py-2 px-4'>{val.unitPrice}</td>
                  <td className='py-2 px-4'>{val.status}</td>
                  <td className='py-2 px-4'>
                    {val.status === 'Requested' && (
                      <>
                        <button onClick={() => handleAccept(key)} className='bg-green-800 text-white rounded-lg  px-2 py-1 mr-2'>
                          Accept
                        </button>
                        <button onClick={() => handleReject(key)} className='bg-red-800 text-white rounded-lg px-2 py-1'>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>:''
      }
     
    </div>
    </>
    
  );
}
