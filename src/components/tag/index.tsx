import { Link } from 'react-router-dom'
import { CrudFilters } from '@refinedev/core'

type TagProps = {
  tags: string[][] | undefined
  setFilter: (filters: CrudFilters) => void
  onTagClick: () => void
}

export const Tag: React.FC<TagProps> = ({ tags, setFilter, onTagClick }) => {
  return (
    <div className='col-md-3'>
      <div className='sidebar'>
        <p>Popular Tags</p>
        {!tags && <p>Loading tags...</p>}
        <div className='tag-list'>
          {tags?.map((item, index: number) => {
            return (
              <Link
                key={index}
                to='/'
                className='tag-pill tag-default'
                onClick={() => {
                  onTagClick()
                  setFilter([
                    {
                      field: 'tag',
                      value: item,
                      operator: 'eq',
                    },
                  ])
                }}>
                {item}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
