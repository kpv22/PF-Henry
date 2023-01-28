import likeLogo from "../../../assets/foro/like-red.png";
import commentLogo from "../../../assets/foro/comment.png";
import editLogo from "../../../assets/foro/edit.png";
import trashlogo from "../../../assets/foro/trash.png";
import { useAuth0 } from "@auth0/auth0-react";
import Foro_comments from "./Foro_comments";
import moment from "moment";
import { useState } from "react";
import { postCommentsPosts } from "../../../../helpers/foro/postCommentsPosts";

interface Comment{
  _id: string;
  author: any;
  content: string;
  likes: [];
  deleted: boolean
}

interface User{
  username: string;
  userName: string;
}
interface Foro_Card {
  commentary: any
  handlerChangeComment: any
  submitComment: any
  id: string;
  title: string;
  post: string;
  content: string;
  img: string;
  likes: string;
  author: string;
  email: string
  onDeletePost: any;
  userId: string;
  comments: Comment[];
  onEdit: any;
  onLikePost: any;
  created: Date
  onDeleteComment: any
}
// : React.FC
export function Foro_card({
  commentary,
  handlerChangeComment,
  submitComment,
  id,
  title,
  content,
  likes,
  img,
  author,
  email,
  comments,
  userId,
  onDeletePost,
  onLikePost,
  onEdit,
  created,
  onDeleteComment
}: Foro_Card) {
  const { user } = useAuth0();
  
  /*
  const [commentary, setCommentary] = useState({
    content: "",
    post: id,
    email: email
  })
  */
  
  console.log(commentary)

  /*
  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentary({
      ...commentary,
      [e.target.name] : e.target.value
    })
  }
    */

  
 
  


  return (
    <div className='foro_card_Container' key={id}>
      <div className='foro_card_InfoPOST'>
        <div className='foro_card_authorSide'>
          <h3>{author}</h3>
          <h5>{moment(created).fromNow()}</h5>
          {
            /* 
            <img
              className='foro_card_buttonEdit'
              src={
                "https://cdn.iconscout.com/icon/free/png-256/more-horizontal-3114524-2598156.png"
              }
              alt='edit'
            />
            */
          }
        </div>
        <div className='foro_card_titleSide'>
          <h3>{title}</h3>
        </div>
        {}
        <div className='foro_card_contentSide'>
          <p>{content}</p>
        </div>

        {img && (
          <div className='foro_card_imagenSide'>
            <img src={img} alt={title} />
          </div>
        )}

        <div className='foro_card_socialContainer'>
          <div className='foro_card_social_Left'>
            <img
              className='foro_card_button_Delete'
              src={trashlogo}
              onClick={() => onDeletePost(id, userId)}
            />
            <img
              onClick={() => onEdit(id, content)}
              className='foro_card_button_Edit'
              src={editLogo}
            />
          </div>

          <div className='foro_card_social_Right'>
            <p>{likes}</p>
            <img
              onClick={() => onLikePost(id)}
              className='foro_card_buttonLike'
              src={likeLogo}
              alt='like'
            />
            <p>{comments.length}</p>
            <img
              className='foro_card_buttonComment'
              src={commentLogo}
              alt='comment'
            />
          </div>
        </div>
          <hr/>
      </div>
      <div className='foro_card_infoCOMMENT'>
        <div className='foro_card_CommentPostSide'>
          <img src={user?.picture} alt="" />
          <textarea onChange={handlerChangeComment} name="content" placeholder="Post a commentary..." value={commentary.content} className="foro_card_CommentArea" />
        </div>
        <div className="foro_card_SubmitCommentSide">
          <button onClick={()=> submitComment(id, email)}>Comment</button>
        </div>
        {comments?.filter(e=> e.deleted!=true).map((comment, index) =>
          <Foro_comments
          author={comment.author.username}
          email={comment.author.email}
          likes={comment.likes} 
          _id={comment._id} 
          content={comment.content}
          onDeleteComment={onDeleteComment}
          />
        )}
      </div>

    </div>
  );
}
