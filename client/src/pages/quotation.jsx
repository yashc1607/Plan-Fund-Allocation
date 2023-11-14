import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function advertisement() {
  var coordinatorUser=false;
  const {currentUser}=useSelector((state)=>state.user);
  const [AllQuotationData, setAllQuotation] = useState([]);
  const [getProposalError, setProposalError] = useState(false);
  const [getQuotationError, setQuotationError] = useState(false);
  const [submissionData, setSubmissionData] = useState([]);
  const [quotationData, setQuotationData] = useState([]);
  const [rejectID,setRejectID]=useState([]);

  if(currentUser && currentUser.usertype==='coordinator'){
    coordinatorUser=true;
  }
  useEffect(() => {
    getAllQuotation();
  }, []);
  const getAllQuotation = async () => {
    try {
      setProposalError(false);
      
      const res = await fetch('/api/quotation/getAllQuotation');
      //console.log(res);
      const data = await res.json();
      if (data.success === false) {
        setAllQuotation(data);
        return;
      }
      setAllQuotation(data);
    } catch (error) {
      setProposalError(error);
    }
  };
  //console.log(AllQuotationData);
  const handleAccept = async (key) => {
    try {
        const response = await fetch(`/api/quotation/acceptQuotation/${key._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: 'Quotation Accepted'}),
        });
        //console.log(response);
        if (response.ok) {
          const res = await fetch(`/api/proposal/acceptQuotation/${key.advId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                status: 'Quotation Accepted'}),
          });
          window.location.reload(false);
          
          //handleBulkReject();
          
            // Handle success if needed
        } else {
            console.error('Failed to accept proposal');
        }
    } catch (error) {
        console.error('Error accepting proposal:', error);
    }
  };

  const handleReject = async (key) => {
    try {

        const response = await fetch(`/api/quotation/rejectQuotation/${key._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: 'Quotation Rejected',}),
        });
        //console.log(response);
        if (response.ok) {

          window.location.reload(false);
            // Handle success if needed
        } else {
            console.error('Failed to reject proposal');
        }
    } catch (error) {
        console.error('Error rejecting proposal:', error);
    }
  };
  const handleBulkReject = async (key) => {
    try {

        const response = await fetch(`/api/quotation/rejectQuotation/${key._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: 'Quotation Rejected',}),
        });
        //console.log(response);
        if (response.ok) {

          window.location.reload(false);
            // Handle success if needed
        } else {
            console.error('Failed to reject proposal');
        }
    } catch (error) {
        console.error('Error rejecting proposal:', error);
    }
  };
  //const submittedQuotation = quotationData.filter((quotaion) => quotaion.status === 'Quotation Submitted');
  //console.log(submittedQuotation);
  const handleUploadQuotation = async (val) => {
    try {
      //console.log(val);
      setQuotationError(false);

      const res = await fetch('/api/quotation/uploadQuotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status:"Quotation Submitted",
        }),
      });
      const data = await res.json();
      setSubmissionData(data);
    } catch (error) {
      setSubmissionData(error);
      //console.log(error);
    }
  };
  
  const acceptedQuotation = AllQuotationData.filter((quotation) => quotation.status === 'Quotation Accepted');
  //console.log(acceptedQuotation);
  // console.log(submittedQuotation);
  const rejectedQuotation = AllQuotationData.filter((quotation) => quotation.status === 'Quotation Rejected');
  const toBeRejected = AllQuotationData.filter(
    (quotation) => acceptedQuotation.some((accepted) => accepted.advId === quotation.advId && quotation._id!==accepted._id)
  );
  // console.log(AllQuotationData);
  // console.log(toBeRejected);
  for(const key in toBeRejected){
    const id=toBeRejected[key];
    console.log(rejectedQuotation);
  }

  
  return (
    <div>
      <h1 className='bg-slate-300 rounded-xl mx-auto gap-4 flow-root p-3 text-lg font-semibold m-4'>Submitted Quotation</h1>
        <div >
          {AllQuotationData.length>0?
          <>
          <table className='min-w-mid  bg-slate-100 border border-slate-200 m-4 mx-auto'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Submitted By</th>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Budget</th>
                <th className='py-2 px-4'>Specification</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Quotation Details</th>
                {coordinatorUser?
                <th className='py-2 px-4'>Action</th>
                :''}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {AllQuotationData.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.name}</td>
                  <td className='py-2 px-4'>{val.description}</td>
                  <td className='py-2 px-4'>{val.budget}</td>
                  <td className='py-2 px-4'>{val.specification}</td>
                  <td className='py-2 px-4'>{val.status}</td>
                  <td className='py-2 px-4'>{val.other}</td>
                  <td>
                    {coordinatorUser && val.status==='Quotation Submitted'?
                      <>
                        <button onClick={() => handleAccept(val)} className='bg-green-800 text-white rounded-lg  px-2 py-1 m-2'>Accept</button>
                        <button onClick={() => handleReject(val)} className='bg-red-800 text-white rounded-lg px-2 py-1 m-2'>Reject</button>
                      </>
                      :''
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
          :<h1 className='text-center text-amber-700 text-lg font-semibold m-4'>No Tender Released</h1>}
        </div>

        {/*Quotation submitted by Vendor */}
        <div>
          {coordinatorUser?
          <>
          <h1 className='bg-slate-300 rounded-xl mx-2 gap-4 flow-root p-3 text-lg font-semibold'>Accepted Quotation</h1>
          {acceptedQuotation.length>0?
          <table className='min-w-mid  bg-slate-100 border border-slate-200 m-6 mx-auto'>
          <thead className='bg-slate-200 text-slate-700'>
            <tr>
              <th className='py-2 px-4'>Description</th>
              <th className='py-2 px-4'>Budget</th>
              <th className='py-2 px-4'>Specification</th>
              <th className='py-2 px-4'>Status</th>
              <th className='py-2 px-4'>Quotation Details</th>
              
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {acceptedQuotation.map((val, key) => (
              <tr key={key} className='hover:bg-slate-50 text-center'>
                <td className='py-2 px-4'>{val.description}</td>
                <td className='py-2 px-4'>{val.budget}</td>
                <td className='py-2 px-4'>{val.specification}</td>
                <td className='py-2 px-4'>{val.status}</td>
                <td className='py-2 px-4'>{val.other}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
          :<h1 className='text-center text-amber-700 text-lg font-semibold m-4'>No Accepted Quotation</h1>}
          </>
          :''}
        </div>
    </div>
    
  )
}

