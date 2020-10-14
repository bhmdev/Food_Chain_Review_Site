package com.launchacademy.reviews.seeders;

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
        List<FoodChain> foodChainList = new ArrayList<>();

        FoodChain pandaExpress = new FoodChain();
        pandaExpress.setName("Panda Express");
        pandaExpress.setDelivery(true);
        pandaExpress.setDescription("Best sugar chicken EVER");
        pandaExpress.setImgUrl("https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)");
        foodChainList.add(pandaExpress);

        FoodChain chipotle = new FoodChain();
        chipotle.setName("Chipotle");
        chipotle.setDelivery(true);
        chipotle.setDescription("Quintessential TexMex craving satisfaction");
        chipotle.setImgUrl("https://images.unsplash.com/photo-1568106690101-fd6822e876f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80");
        foodChainList.add(chipotle);

        FoodChain mcdonalds = new FoodChain();
        mcdonalds.setName("McDonalds");
        mcdonalds.setDelivery(true);
        mcdonalds.setDescription("Best fast food fries you can find anywhereeee");
        mcdonalds.setImgUrl("https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80");
        foodChainList.add(mcdonalds);

        FoodChain applebees = new FoodChain();
        applebees.setName("Applebees");
        applebees.setDelivery(false);
        applebees.setDescription("Casual dining, with mainstream American dishes such as salads, chicken, pasta, burgers, and 'riblets'.");
        applebees.setImgUrl("https://www.applebees.com/-/media/applebees/campaigns-2/health-and-safety/sanitation-lower-module-desktop.jpg?la=en&hash=87F93C0DB6C15FF647D5C4BE3A8D9F5938E36C9E)");
        foodChainList.add(applebees);

        FoodChain fiveGuys = new FoodChain();
        fiveGuys.setName("Five Guys");
        fiveGuys.setDelivery(false);
        fiveGuys.setDescription("The Artery Annihilator");
        fiveGuys.setImgUrl("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-0056-1575287109.jpg");
        foodChainList.add(fiveGuys);

        FoodChain timHortons = new FoodChain();
        timHortons.setName("Tim Hortons");
        timHortons.setDelivery(false);
        timHortons.setDescription("It's better than Dunkin Donuts.");
        timHortons.setImgUrl("https://www.gannett-cdn.com/-mm-/2425a0470766b558967df12696ca47cade450c8d/c=149-99-2888-1647/local/-/media/2018/01/20/INGroup/Indianapolis/636520357268068995--us-images-Tim-Hortons-Exterior-2.jpg");
        foodChainList.add(timHortons);

        FoodChain chickfila = new FoodChain();
        chickfila.setName("Chick-Fil-A");
        chickfila.setDelivery(false);
        chickfila.setDescription("Chick-fil-A Chicken Sandwich");
        chickfila.setImgUrl("https://cdn0.wideopeneats.com/wp-content/uploads/2017/10/chick-fil-a-menu-items.png");
        foodChainList.add(chickfila);

        for (FoodChain foodChain: foodChainList) {
            foodChainRepository.save(foodChain);
        }
    }
}
