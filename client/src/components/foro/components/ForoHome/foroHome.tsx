import { useForoHome } from "./hooks/useForoHome";
import { Foro_card } from "../Foro_card";
import Foro_editPost from "../EditPost/Foro_editPost";
//------- USUARIO HELPER ----------
import FilterPanel from "../FIlter_panel";
import Foro_createPost from "../Foro_createPost";
//---------------

export default function ForoHome() {
  //-------CUSTOM HOOK-------
  const [
    form,
    commentary,
    allPost,
    editOpen,
    editPost,
    {
      likeHandler,
      handlerSubmit,
      handlerSubmitEdit,
      handlerChangePost,
      onDeletePost,
      onDeleteComment,
      editHandlerModal,
      setEditOpen,
      handlerChangeComment,
      submitComment
    },
  ]: any = useForoHome();
  //-------CUSTOM HOOK-------

  return (
    <div className='foro_home_container'>
      {editOpen && (
        <Foro_editPost
          onSave={handlerSubmitEdit}
          id={editPost.id}
          content={editPost.content}
          onClose={setEditOpen}
        />
      )}
      <div className='foro_posts_container'>
        <Foro_createPost
          form={form}
          handlerChangePost={handlerChangePost}
          handlerSubmit={handlerSubmit}
        />

        {allPost?.map((post: any) => (
          <Foro_card
            commentary={commentary}
            handlerChangeComment={handlerChangeComment}
            submitComment={submitComment}
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            img={post.image}
            post={post}
            author={post.author.userName || post.author.username}
            email={post.author.email}
            userId={post.author._id}
            comments={post.comments}
            likes={post.likes.length}
            onDeletePost={onDeletePost}
            onLikePost={likeHandler}
            onEdit={editHandlerModal}
            created={post.created}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </div>

      <FilterPanel />
    </div>
  );
}
