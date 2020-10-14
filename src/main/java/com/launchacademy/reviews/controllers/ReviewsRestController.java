@RestController
@RequestMapping("api/v1/reviews")
public class ReviewsRestController {
    private FoodChainRepository foodChainRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public class ReviewsRestController {
        private ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
        }
    }

    @PostMapping
    public Review review(@RequestBody Review review) {

        review.setComment("Some restaurant?")
    }
}