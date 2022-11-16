import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

function DetailsPage() {
  
  const params = useParams();
  const history = useHistory();

  //TODO: figure out how to pass the selected object to DetailsPage
  const allPins = useSelector(store => store.pins);

  // get selected pin object from store - search using id stored in params
  const selected = (allPins.filter(pin => pin.id == params.id))[0];
  console.log('date:', format(parseISO(selected.date), 'yyyy-MM-dd'));
  //let newdate=selected.date; 
  //console.log('date is:', (newdate).toDateString())

  const closeDetails = (evt) => {
    evt.preventDefault();
    console.log('in close details');
    history.push('/');
  }

  return (
    <>
      <h1>Details Page</h1>
      <button onClick={(evt)=>{closeDetails(evt)}}>Close Details</button>
      <section>
        <h2>{selected.title}</h2>
        <h3>{selected['latin name']}</h3>
        <h4>{format(parseISO(selected.date), 'yyyy-MM-dd')}</h4>
        <h4>{selected.date}</h4>
        <img src={selected.img_url} />
        <p>Description: {selected["text entry"]}</p>
      </section>
      <h2>Comments</h2>
      <form id='addCommentform' action='post'>
        <label for='commentInputTextarea'>Add Comment</label>
        <textarea id='commentInputTextarea' name='comment'>

        </textarea>
        <button>Add comment</button>
      </form>
    </>
  );
}

export default DetailsPage;