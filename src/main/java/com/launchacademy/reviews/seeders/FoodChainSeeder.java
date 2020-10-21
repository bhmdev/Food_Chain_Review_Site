package com.launchacademy.reviews.seeders;

import com.google.common.collect.Lists;
import com.launchacademy.reviews.models.FoodChain;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FoodChainSeeder {
    private FoodChainRepository foodChainRepository;

    @Autowired
    public FoodChainSeeder(FoodChainRepository foodChainRepository) {
        this.foodChainRepository = foodChainRepository;
    }

    public void seed() {
        if(Lists.newArrayList(foodChainRepository.findAll()).isEmpty()) {
            List<FoodChain> foodChainList = new ArrayList<>();

            FoodChain pandaExpress = new FoodChain();
            pandaExpress.setName("Panda Express");
            pandaExpress.setDelivery(true);
            pandaExpress.setDescription("Best sugar chicken EVER");
            pandaExpress.setImgUrl(
                "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)");
            foodChainList.add(pandaExpress);

            FoodChain chipotle = new FoodChain();
            chipotle.setName("Chipotle");
            chipotle.setDelivery(true);
            chipotle.setDescription("Quintessential TexMex craving satisfaction");
            chipotle.setImgUrl(
                "https://mk0dapulseasrqgbt62s.kinstacdn.com/wp-content/uploads/2019/10/chipotle-next-kitchen-dapulse.jpg");
            foodChainList.add(chipotle);

            FoodChain mcdonalds = new FoodChain();
            mcdonalds.setName("McDonalds");
            mcdonalds.setDelivery(true);
            mcdonalds.setDescription("Best fast food fries you can find anywhereeee");
            mcdonalds.setImgUrl(
                "https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80");
            foodChainList.add(mcdonalds);

            FoodChain applebees = new FoodChain();
            applebees.setName("Applebees");
            applebees.setDelivery(false);
            applebees.setDescription(
                "Casual dining, with mainstream American dishes such as salads, chicken, pasta, burgers, and 'riblets'.");
            applebees.setImgUrl(
                "https://static.olocdn.net/menu/applebees/960075b57731f4ecf8246c5a182abc37.jpg");
            foodChainList.add(applebees);

            FoodChain fiveGuys = new FoodChain();
            fiveGuys.setName("Five Guys");
            fiveGuys.setDelivery(false);
            fiveGuys.setDescription("The Artery Annihilator");
            fiveGuys.setImgUrl(
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-0056-1575287109.jpg");
            foodChainList.add(fiveGuys);

            FoodChain timHortons = new FoodChain();
            timHortons.setName("Tim Hortons");
            timHortons.setDelivery(false);
            timHortons.setDescription("It's better than Dunkin Donuts.");
            timHortons.setImgUrl(
                "https://d1ralsognjng37.cloudfront.net/ba832c4b-1ba2-419e-a97d-07653636b187.jpeg");
            foodChainList.add(timHortons);

            FoodChain chickfila = new FoodChain();
            chickfila.setName("Chick-Fil-A");
            chickfila.setDelivery(false);
            chickfila.setDescription("Chick-fil-A Chicken Sandwich");
            chickfila.setImgUrl(
                "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2018/06/chick-fil-a-spicy-deluxe-fries.jpg?fit=1024%2C750&ssl=1");
            foodChainList.add(chickfila);

            for (FoodChain foodChain : foodChainList) {
                foodChainRepository.save(foodChain);
            }
        }
    }
}
