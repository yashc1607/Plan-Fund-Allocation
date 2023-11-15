import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function advertisement() {
  var vendorUser=false;
  const {currentUser}=useSelector((state)=>state.user);
  const [proposalAllData, setProposalAllData] = useState([]);
  const [getProposalError, setProposalError] = useState(false);
  const [getQuotationError, setQuotationError] = useState(false);
  const [submissionData, setSubmissionData] = useState([]);
  const [quotationData, setQuotationData] = useState([]);
  
  if(currentUser && currentUser.usertype==='vendor'){
    vendorUser=true;
  }
  useEffect(() => {
    getAllProposal();
  }, []);
  const getAllProposal = async () => {
    try {
      setProposalError(false);
      
      const res = await fetch('/api/proposal/getAllProposal');
      //console.log(res);
      const data = await res.json();
      if (data.success === false) {
        setProposalAllData(data);
        return;
      }
      setProposalAllData(data);
    } catch (error) {
      setProposalError(error);
    }
  };

  if(vendorUser){
    useEffect(() => {
      getQuotation();
    }, []);
  }
  
  const getQuotation = async () => {
    try {
      setQuotationError(false);
      const { email } = currentUser;
      const queryParams = new URLSearchParams({
        email,
      });
      const res = await fetch(`/api/quotation/getQuotation?${queryParams.toString()}`);
      //console.log(res);
      const data = await res.json();
      if (data.success === false) {
        setQuotationData(data);
        return;
      }
      setQuotationData(data);
    } catch (error) {
      setQuotationError(error);
    }
  };
  const submittedQuotation = quotationData.filter((quotaion) => quotaion.status === 'Quotation Submitted');
  const nonAcceptedQuotation = quotationData.filter((quotaion) => quotaion.status !== 'Quotation Accepted');
  const acceptedQuotation = quotationData.filter((quotaion) => quotaion.status === 'Quotation Accepted');
  const delivered = quotationData.filter((quotaion) => quotaion.status === 'Delivered');
  //console.log(acceptedQuotation);
  const handleUploadQuotation = async (val) => {
    try {
      //console.log(val);
      setQuotationError(false);
      const budget = prompt('Enter the budget for quotaion:');
      const details = prompt('Enter details of quotation:');

      const res = await fetch('/api/quotation/uploadQuotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name,
          status:"Quotation Submitted",
          description:val.description,
          budget:budget,
          other:details,
          advId:val._id,
          specification:val.specification
        }),
      });
      const data = await res.json();
      setSubmissionData(data);
    } catch (error) {
      setSubmissionData(error);
      //console.log(error);
    }
  };

  const handleDeliveredQuotation = async (key) => {
    try {
        const response = await fetch(`/api/quotation/deliveredQuotation/${key._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: 'Delivered'}),
        });
        //console.log(response);
        if (response.ok) {
          const res = await fetch(`/api/proposal/deliveredQuotation/${key.advId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                status: 'Delivered'}),
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

  const allAdvCreated = proposalAllData.filter((proposal) => proposal.status === 'Advertisement Created');
  //console.log(allAdvCreated);
  //console.log(submittedQuotation);
  const filteredAdvCreated = allAdvCreated.filter(
    (advCreated) => !submittedQuotation.some((submitted) => submitted.advId === advCreated._id)
  );
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center m-4'>Tender Notice</h1>
      
        <div >
          {filteredAdvCreated.length>0?
          <>
          <p className='text-xl font-semibold text-left m-4'>Department of Computer Science, NIT Calicut intends to procure items for its operation. Tenders are invited from registered and reputable firms for the following services:</p>
          
          <table className='min-w-mid  bg-slate-100 border border-slate-200 m-4 transform translate-x-1/3'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Quantity</th>
                <th className='py-2 px-4'>Budget</th>
                <th className='py-2 px-4'>Specification</th>
                {vendorUser?
                <th className='py-2 px-4'>Action</th>
                :''}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {filteredAdvCreated.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.advertisement}</td>
                  <td className='py-2 px-4'>{val.quantity}</td>
                  <td className='py-2 px-4'>{val.budget}</td>
                  <td className='py-2 px-4'>{val.specification}</td>
                  <td>
                    {vendorUser?
                      <div>
                      <button onClick={() => handleUploadQuotation(val)} className='bg-blue-900 text-white rounded-lg  px-2 py-1 m-1'>Submit Quotation</button>
                      </div>
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
          {vendorUser?
          <>
          <h1 className='bg-slate-300 rounded-xl mx-2 gap-4 flow-root p-3 text-lg font-semibold'>Submitted Quotation</h1>
          {nonAcceptedQuotation.length>0?
          <table className='min-w-mid  bg-slate-100 border border-slate-200 mx-2 m-4 transform translate-x-1/4'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Budget</th>
                <th className='py-2 px-4'>Details</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {nonAcceptedQuotation.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.description}</td>
                  <td className='py-2 px-4'>{val.status}</td>
                  <td className='py-2 px-4'>{val.budget}</td>
                  <td className='py-2 px-4'>{val.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
          :<h1 className='text-center text-amber-700 text-lg font-semibold m-4'>No Submitted Quotations</h1>}
          </>
          :''}
          {vendorUser?
          <>
          <h1 className='bg-slate-300 rounded-xl mx-2 gap-4 flow-root p-3 text-lg font-semibold'>Accepted Quotation</h1>
          {acceptedQuotation.length>0?
          <table className='min-w-mid  bg-slate-100 border border-slate-200 mx-2 m-4 transform translate-x-1/4'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Budget</th>
                <th className='py-2 px-4'>Details</th>
                {vendorUser?
                <th className='py-2 px-4'>Action</th>
                :''}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {acceptedQuotation.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.description}</td>
                  <td className='py-2 px-4'>{val.status}</td>
                  <td className='py-2 px-4'>{val.budget}</td>
                  <td className='py-2 px-4'>{val.other}</td>
                  <td>
                    {vendorUser?
                      <div>
                      <button onClick={() => handleDeliveredQuotation(val)} className='bg-blue-900 text-white rounded-lg  px-2 py-1 m-1'>Delivered</button>
                      </div>
                      :''
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :<h1 className='text-center text-amber-700 text-lg font-semibold m-4'>No Accepted Quotations</h1>}
          </>
          :''}
          {vendorUser?
          <>
          <h1 className='bg-slate-300 rounded-xl mx-2 gap-4 flow-root p-3 text-lg font-semibold'>Delivered Quotation</h1>
          {delivered.length>0?
          <table className='min-w-mid  bg-slate-100 border border-slate-200 mx-2 m-4 transform translate-x-1/4'>
            <thead className='bg-slate-200 text-slate-700'>
              <tr>
                <th className='py-2 px-4'>Description</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Budget</th>
                <th className='py-2 px-4'>Details</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {delivered.map((val, key) => (
                <tr key={key} className='hover:bg-slate-50 text-center'>
                  <td className='py-2 px-4'>{val.description}</td>
                  <td className='py-2 px-4'>{val.status}</td>
                  <td className='py-2 px-4'>{val.budget}</td>
                  <td className='py-2 px-4'>{val.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
          :<h1 className='text-center text-amber-700 text-lg font-semibold m-4'>No Delivered Quotations</h1>}
          </>
          :''}
        </div>
    </div>
  )
}

