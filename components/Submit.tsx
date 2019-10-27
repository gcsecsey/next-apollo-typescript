import { useMutation } from '@apollo/react-hooks'
import { ALL_POSTS_QUERY, allPostsQueryVars } from '../graphql/post/queries/allPosts'
import { CREATE_POST_MUTATION } from '../graphql/post/mutations/createPost'
import { ChangeEvent } from 'react'
import { AllPostsQuery } from '../generated/apolloComponents'

export default function Submit() {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const url = formData.get('url')
    form.reset()

    createPost({
      variables: { title, url },
      update: (proxy, { data: { createPost } }) => {
        const { allPosts }: AllPostsQuery | any = proxy.readQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars
        })
        // Update the cache with the new post at the top of the
        proxy.writeQuery({
          query: ALL_POSTS_QUERY,
          data: { allPosts: allPosts.concat([createPost]) },
          variables: allPostsQueryVars
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder='title' name='title' type='text' required />
      <input placeholder='url' name='url' type='url' required />
      <button type='submit' disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}
