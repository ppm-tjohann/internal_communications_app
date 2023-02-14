```typescript jsx
import AddEventsPopup from './AddEventsPopup'
import AddEventForm from './AddEventForm'
import EventForm from './EventForm'
import CalendarHeader from './CalendarHeader'
import EventPopup from './EventPopup'
import CalendarViewHandler from './CalendarViewHandler'
import WeekDaysGrid from './WeekDaysGrid'
import DayTile from './DayTile'
import EventListItem from './EventListItem'



return (
  <AddEventsPopup>
      <AddEvent>
          <AddEventForm>
              <EventForm/>
          </AddEventForm>
      </AddEvent>

      <CalendarView>
          <CalendarHeader/>

          <CalendarViewHandler>
              <WeekDaysGrid/>
              <DayTile>
                  <EventList>
                      <EventListItem/>
                  </EventList>
              </DayTile>
          </CalendarViewHandler>

          <EventPopup/>
      </CalendarView>
  </AddEventsPopup>
)
```

***Post-Komponent

```typescript jsx
import PostWrapper from './PostWrapper'
import AddComment from './AddComment'
import CommentsProvider from './CommentProvider'
import PostLikes from './PostLikes'



return (
  <PostWrapper>
      <PostHeader/>
      <PostImage/>
      <PostActions>
          <PostLikes/>
      </PostActions>
      <PostInfo/>
      <PostComments>
          <CommentsProvider>
              <CommentList>
                  <CommentView/>
                  <AddComment/>
              </CommentList>
          </CommentsProvider>
      </PostComments>
  </PostWrapper>
)
```