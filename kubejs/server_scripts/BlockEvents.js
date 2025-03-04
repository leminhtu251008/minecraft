LootJS.modifiers(lootModifierEvent => {

    lootModifierEvent
        .addEntityLootModifier("cataclysm:ender_guardian")
        .removeLoot("cataclysm:gauntlet_of_guard")
        .addLoot("cataclysm:ender_guardian_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("kubejs:void_diamond_heart", 5)   
                .when((c) => c.randomChance(0.2)),
            LootEntry
                .of("cataclysm:void_core", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:netherite_monstrosity")
        .removeLoot("cataclysm:infernal_forge")
        .removeLoot("cataclysm:monstrous_horn")
        .addLoot("cataclysm:netherite_monstrosity_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("kubejs:lava_diamond_heart", 5)        
                .when((c) => c.randomChance(0.2)),
            LootEntry
                .of("cataclysm:monstrous_horn", 5)
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:ignis")
        .removeLoot("cataclysm:ignitium_ingot")
        .addLoot("cataclysm:ignis_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("cataclysm:ignitium_ingot", 20)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:the_harbinger")
        .removeLoot("cataclysm:witherite_block")
        .addLoot("cataclysm:the_harbinger_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("cataclysm:witherite_ingot", 20)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:the_leviathan")
        .removeLoot("cataclysm:tidal_claws")
        .addLoot("cataclysm:the_leviathan_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("kubejs:abyssal_eye", 5)        
                .when((c) => c.randomChance(0.2)),
            LootEntry.of("minecraft:nautilus_shell", 5),
            LootEntry.of("minecraft:crystallized_coral", 5),
            LootEntry.of("minecraft:coral_chunk", 5),
            LootEntry.of("minecraft:amethys_crab_shell", 5),
            LootEntry.of("minecraft:lionfish", 5)
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:ancient_remnant")
        .removeLoot("cataclysm:sandstorm_in_a_bottle")
        .removeLoot("cataclysm:ancient_metal_block")
        .addLoot("cataclysm:ancient_remnant_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("cataclysm:sandstorm_in_a_bottle", 5)        
                .when((c) => c.randomChance(0.2)),
            LootEntry
                .of("cataclysm:ancient_metal_ingot", 5)        
                .when((c) => c.randomChance(0.2)),
            LootEntry.of("minecraft:kobolediator_skull", 5),
            LootEntry.of("minecraft:koboleton_bone", 10)
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:ancient_ancient_remnant")
        .removeLoot("cataclysm:sandstorm_in_a_bottle")
        .removeLoot("cataclysm:ancient_metal_block")
        .addLoot("cataclysm:ancient_remnant_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("cataclysm:sandstorm_in_a_bottle", 5)        
                .when((c) => c.randomChance(0.2)),
            LootEntry
                .of("cataclysm:ancient_metal_ingot", 10)        
                .when((c) => c.randomChance(0.2)),
            LootEntry.of("minecraft:kobolediator_skull", 5),
            LootEntry.of("minecraft:koboleton_bone", 10)

        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:kobolediator")
        .removeLoot("cataclysm:ancient_metal_ingot")

    lootModifierEvent
        .addEntityLootModifier("cataclysm:koboleton")
        .removeLoot("cataclysm:ancient_metal_ingot")
        .removeLoot("cataclysm:ancient_metal_nugget")

    lootModifierEvent
        .addEntityLootModifier("cataclysm:wadjet")
        .removeLoot("cataclysm:ancient_metal_ingot")

    lootModifierEvent
        .addEntityLootModifier("cataclysm:maledictus")
        .removeLoot("cataclysm:cursium_ingot")
        .addLoot("cataclysm:maledictus_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("cataclysm:cursium_ingot", 10)        
                .when((c) => c.randomChance(0.2)),
            LootEntry
                .of("cataclysm:black_steel_ingot", 10)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("cataclysm:aptrgangr")
        .removeLoot("cataclysm:black_steel_ingot")
        .removeLoot("cataclysm:black_steel_nugget")
        
    lootModifierEvent
        .addEntityLootModifier("cataclysm:draugr")
        .removeLoot("cataclysm:black_steel_ingot")
        .removeLoot("cataclysm:black_steel_nugget")
        
    lootModifierEvent
        .addEntityLootModifier("cataclysm:elite_draugr")
        .removeLoot("cataclysm:black_steel_ingot")
        .removeLoot("cataclysm:black_steel_nugget")

    lootModifierEvent
        .addEntityLootModifier("cataclysm:royal_draugr")
        .removeLoot("cataclysm:black_steel_ingot")
        .removeLoot("cataclysm:black_steel_nugget")

    lootModifierEvent
        .addEntityLootModifier("graveyard:lich")
        .removeLoot("graveyard:black_bone_staff")
        .removeLoot("graveyard:red_bone_staff")
        .removeLoot("graveyard:cyan_bone_staff")
        .removeLoot("graveyard:white_bone_staff")
        .removeLoot("graveyard:purple_bone_staff")
        .addLoot("graveyard:lich_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry
                .of("kubejs:bone_soul", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("aerialhell:mud_cycle_mage")
        .removeLoot("aerialhell:mud_cycle_mage_trophy")
        .addLoot("aerialhell:mud_cycle_mage_spawn_egg")
        .killedByPlayer()
        .matchEquip("head", Item.of("aerialhell:lunatic_helmet"))
        .matchEquip("chest", Item.of("aerialhell:lunatic_chestplate"))
        .matchEquip("legs", Item.of("aerialhell:lunatic_leggings"))
        .matchEquip("feet", Item.of("aerialhell:lunatic_boots"))
        .matchEquip("mainhand", Item.of("aerialhell:lunatic_sword"))
        .addLoot(
            LootEntry
                .of("aerialhell:mud_cycle_mage_trophy", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("aerialhell:lunatic_priest")
        .removeLoot("aerialhell:lunar_priest_trophy")
        .addLoot("aerialhell:lunatic_priest_spawn_egg")
        .killedByPlayer()
        .matchEquip("head", Item.of("aerialhell:lunatic_helmet"))
        .matchEquip("chest", Item.of("aerialhell:lunatic_chestplate"))
        .matchEquip("legs", Item.of("aerialhell:lunatic_leggings"))
        .matchEquip("feet", Item.of("aerialhell:lunatic_boots"))
        .matchEquip("mainhand", Item.of("aerialhell:lunatic_sword"))
        .addLoot(
            LootEntry
                .of("aerialhell:lunar_priest_trophy", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("aerialhell:chained_god")
        .removeLoot("aerialhell:chained_god_trophy")
        .addLoot("aerialhell:chained_god_spawn_egg")
        .killedByPlayer()
        .matchEquip("head", Item.of("aerialhell:volucite_chestplate"))
        .matchEquip("chest", Item.of("aerialhell:volucite_chestplate"))
        .matchEquip("legs", Item.of("aerialhell:volucite_leggings"))
        .matchEquip("feet", Item.of("aerialhell:volucite_boots"))
        .matchEquip("mainhand", Item.of("aerialhell:volucite_sword"))
        .addLoot(
            LootEntry
                .of("aerialhell:chained_god_trophy", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("aerialhell:lilith")
        .removeLoot("aerialhell:lilith_trophy")
        .addLoot("aerialhell:lilith_spawn_egg")
        .killedByPlayer()
        .matchEquip("head", Item.of("aerialhell:arsonist_helmet"))
        .matchEquip("chest", Item.of("aerialhell:arsonist_chestplate"))
        .matchEquip("legs", Item.of("aerialhell:arsonist_leggings"))
        .matchEquip("feet", Item.of("aerialhell:arsonist_boots"))
        .matchEquip("mainhand", Item.of("aerialhell:arsonist_sword"))
        .addLoot(
            LootEntry
                .of("aerialhell:lilith_trophy", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("blue_skies:summoner")
        .addLoot(LootEntry.of("blue_skies:blinding_key", 4))
        .addLoot()
        .killedByPlayer()
        .matchEquip("head", Item.of("blue_skies:charoite_helmet"))
        .matchEquip("chest", Item.of("blue_skies:charoite_chestplate"))
        .matchEquip("legs", Item.of("blue_skies:charoite_leggings"))
        .matchEquip("feet", Item.of("blue_skies:charoite_boots"))
        .matchEquip("mainhand", Item.of("blue_skies:charoite_sword"))
        .addLoot(
            LootEntry
                .of("kubejs:summoner_champion", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("blue_skies:alchemist")
        .addLoot(LootEntry.of("blue_skies:blinding_key", 4))
        .killedByPlayer()
        .matchEquip("head", Item.of("blue_skies:charoite_helmet"))
        .matchEquip("chest", Item.of("blue_skies:charoite_chestplate"))
        .matchEquip("legs", Item.of("blue_skies:charoite_leggings"))
        .matchEquip("feet", Item.of("blue_skies:charoite_boots"))
        .matchEquip("mainhand", Item.of("blue_skies:charoite_sword"))
        .addLoot(
            LootEntry
                .of("kubejs:alchemist_bottle", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("blue_skies:starlit_crusher")
        .addLoot(LootEntry.of("blue_skies:nature_key", 4))
        .killedByPlayer()
        .matchEquip("head", Item.of("blue_skies:diopside_helmet"))
        .matchEquip("chest", Item.of("blue_skies:diopside_chestplate"))
        .matchEquip("legs", Item.of("blue_skies:diopside_leggings"))
        .matchEquip("feet", Item.of("blue_skies:diopside_boots"))
        .matchEquip("mainhand", Item.of("blue_skies:diopside_axe"))
        .addLoot(
            LootEntry
                .of("kubejs:stellaris", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("blue_skies:arachnarch")
        .addLoot(LootEntry.of("blue_skies:poison_key", 4))
        .killedByPlayer()
        .matchEquip("head", Item.of("blue_skies:diopside_helmet"))
        .matchEquip("chest", Item.of("blue_skies:diopside_chestplate"))
        .matchEquip("legs", Item.of("blue_skies:diopside_leggings"))
        .matchEquip("feet", Item.of("blue_skies:diopside_boots"))
        .matchEquip("mainhand", Item.of("blue_skies:different_sword"))
        .addLoot(
            LootEntry
                .of("kubejs:spider_artifact", 5)        
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("minecraft:ender_dragon")
        .removeLoot("memory_of_the_past:codex_of_ascension")
        .addLoot(LootEntry.of("minecraft:end_crystal", 4))        

    lootModifierEvent
        .addEntityLootModifier("minecraft:wither")
        .removeLoot("minecraft:nether_star")
        .removeLoot("memory_of_the_past:codex_of_ascension")
        .killedByPlayer()
        .addLoot("minecraft:nether_star")

    lootModifierEvent
        .addEntityLootModifier("slu:boss_soul_of_cinder")
        .removeLoot("slu:soul_of_cinder_soul")
        .killedByPlayer()
        .addLoot(LootEntry.of("minecraft:wither_skeleton_skull", 3))

    lootModifierEvent
        .addEntityLootModifier("slu:boss_radagon")
        .killedByPlayer()
        .addLoot(LootEntry.of("minecraft:wither_skeleton_skull", 3))

    lootModifierEvent
        .addEntityLootModifier("slu:boss_mohg")
        .killedByPlayer()
        .addLoot(LootEntry.of("minecraft:wither_skeleton_skull", 3))

    lootModifierEvent
        .addEntityLootModifier("slu:boss_ancient_warrior")
        .killedByPlayer()
        .addLoot(LootEntry.of("minecraft:wither_skeleton_skull", 3))

    lootModifierEvent
        .addEntityLootModifier("slu:boss_minecraft_lord")
        .addLoot(
            LootEntry.of("slu:minecraft_lord_soul", 4)
        )
        .addLoot(
            LootEntry.of("minecraft:wither_skeleton_skull", 3)
        )

    lootModifierEvent
        .addEntityLootModifier("bossominium:skelenado_boss")
        .addLoot("bossominium:skelenado_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:bone", 16),
            LootEntry.of("minecraft:arrow", 32),
            LootEntry.of("minecraft:gunpowder", 32),
            LootEntry.of("minecraft:slime_block", 2),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:vengeful_trader_boss")
        .addLoot("bossominium:vengeful_trader_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:emerald_block", 2),
            LootEntry.of("minecraft:amethyst_shard", 8),
            LootEntry.of("minecraft:redstone", 16),
            LootEntry.of("minecraft:lapis_block", 2),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })

    lootModifierEvent
        .addEntityLootModifier("bossominium:netherrack_heart_boss")
        .addLoot("bossominium:netherrack_heart_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:netherrack", 64),
            LootEntry.of("minecraft:blackstone", 64),
            LootEntry.of("minecraft:soul_sand", 32),
            LootEntry.of("minecraft:soul_soil", 32),
            LootEntry.of("minecraft:quartz", 16),
            LootEntry.of("minecraft:glowstone_dust", 16),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:end_stone_sentinel_boss")
        .addLoot("bossominium:end_stone_sentinel_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:end_stone", 64),
            LootEntry.of("minecraft:shulker_shell", 4),
            LootEntry.of("minecraft:obsidian", 8),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:hell_hound_boss")
        .addLoot("bossominium:hell_hound_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:ghast_tear", 4),
            LootEntry.of("minecraft:magma_cream", 16),
            LootEntry.of("minecraft:blaze_rod", 16),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:cultisager_boss")
        .addLoot("bossominium:cultisager_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:sand", 64),
            LootEntry.of("minecraft:red_sand", 64),
            LootEntry.of("minecraft:dirt", 64),
            LootEntry.of("minecraft:gravel", 64),
            LootEntry.of("minecraft:clay", 64),
            LootEntry.of("minecraft:coal", 32),
            LootEntry.of("minecraft:flint", 8),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:golden_ring_boss")
        .addLoot("bossominium:golden_ring_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:iron_block", 2),
            LootEntry.of("minecraft:gold_block", 2),
            LootEntry.of("minecraft:copper_block", 2),
            LootEntry.of("minecraft:diamond_block", 1),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:ancient_remnant_boss")
        .addLoot("bossominium:ancient_remnant_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:ancient_debris", 8),
            LootEntry.of("minecraft:ice", 16),
            LootEntry.of("minecraft:snow_block", 16),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:huntress_boss")
        .addLoot("bossominium:huntress_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:golden_apple", 4),
            LootEntry.of("minecraft:enchanted_golden_apple", 2),
            LootEntry.of("minecraft:golden_carrot", 4),
            LootEntry.of("minecraft:porkchop", 4),
            LootEntry.of("minecraft:beef", 4),
            LootEntry.of("minecraft:mutton", 4),
            LootEntry.of("minecraft:chicken", 4),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:strayed_warrior_boss")
        .addLoot("bossominium:strayed_warrior_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:cobblestone", 64),
            LootEntry.of("minecraft:diorite", 64),
            LootEntry.of("minecraft:andesite", 64),
            LootEntry.of("minecraft:granite", 64),
            LootEntry.of("minecraft:calcite", 64),
            LootEntry.of("minecraft:tuff", 64),
            LootEntry.of("minecraft:deepslate", 64),
            LootEntry.of("minecraft:dripstone_block", 5),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:moss_mech_boss")
        .addLoot("bossominium:moss_mech_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:prismarine_crystals", 16),
            LootEntry.of("minecraft:prismarine_shard", 16),
            LootEntry.of("minecraft:kelp", 8),
            LootEntry.of("minecraft:lily_pad", 4),
            LootEntry.of("minecraft:sponge", 4),
            LootEntry.of("minecraft:pufferfish", 4),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:fungal_brute_boss")
        .addLoot("bossominium:fungal_brute_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:leather", 16),
            LootEntry.of("minecraft:white_wool", 16),
            LootEntry.of("minecraft:feather", 16),
            LootEntry.of("minecraft:string", 16),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:chorus_beast_boss")
        .addLoot("bossominium:chorus_beast_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:chorus_fruit", 16),
            LootEntry.of("minecraft:melon", 16),
            LootEntry.of("minecraft:pumpkin", 16),
            LootEntry.of("minecraft:brown_mushroom", 16),
            LootEntry.of("minecraft:red_mushroom", 16),
            LootEntry.of("minecraft:bamboo", 16),
            LootEntry.of("minecraft:sugar_cane", 16),
            LootEntry.of("minecraft:cactus", 16),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bossominium:morsemancer_boss")
        .addLoot("bossominium:morsemancer_boss_spawn_egg")
        .killedByPlayer()
        .addLoot(
            LootEntry.of("minecraft:oak_wood", 16),
            LootEntry.of("minecraft:spruce_wood", 16),
            LootEntry.of("minecraft:birch_wood", 16),
            LootEntry.of("minecraft:jungle_wood", 16),
            LootEntry.of("minecraft:acacia_wood", 16),
            LootEntry.of("minecraft:dark_oak_wood", 16),
            LootEntry.of("minecraft:mangrove_wood", 16),
            LootEntry.of("minecraft:cherry_wood", 16),
            LootEntry.of("memory_of_the_past:great_drop_of_knowledge", 2),
            LootEntry.of("repair_workbench:repairstone", 30),
            LootEntry.of("kubejs:absolute_smithing_template", 1),
        )
        .pool((p) => {
            p.addLoot("minecraft:book", "minecraft:book", "minecraft:book", "minecraft:book")
            p.enchantRandomly()
        })


    lootModifierEvent
        .addEntityLootModifier("bosses_of_mass_destruction:lich")
        .removeLoot("bosses_of_mass_destruction:ancient_anima")
        .addLoot(
            LootEntry
                .of("bosses_of_mass_destruction:ancient_anima", 5)
                .when((c) => c.randomChance(0.2))
        )

    lootModifierEvent
        .addEntityLootModifier("bosses_of_mass_destruction:void_blossom")
        .removeLoot("bosses_of_mass_destruction:void_thorn")
        .addLoot(
            LootEntry
                .of("bosses_of_mass_destruction:void_thorn", 5)
                .when((c) => c.randomChance(0.2))
        )
})

ItemEvents.crafted(ItemCraftedEV => {
    let itemCrafted = ItemCraftedEV.item
    let itemName = itemCrafted.item.id

    if (!itemName.includes("wom:")) {
        return
    }

    if (itemName == "wom:agony") {
        itemCrafted.setHoverName("Absolute Agony")
    } else if (itemName == "wom:tormented_mind") {
        itemCrafted.setHoverName("Absolute Torment")
    } else if (itemName == "wom:ruine") {
        itemCrafted.setHoverName("Absolute Ruine")
    } else if (itemName == "wom:ender_blaster") {
        itemCrafted.setHoverName("Absolute Ender blaster")
    } else if (itemName == "wom:satsujin") {
        itemCrafted.setHoverName("Absolute Satsujin")
    } else if (itemName == "wom:herrscher") {
        itemCrafted.setHoverName("Absolute Herrscher")
    } else if (itemName == "wom:gesetz") {
        itemCrafted.setHoverName("Absolute Gesetz")
    } else if (itemName == "wom:moonless") {
        itemCrafted.setHoverName("Absolute Moonless")
    } else if (itemName == "wom:solar") {
        itemCrafted.setHoverName("Absolute Solar")
    } else if (itemName == "wom:demon_seal") {
        itemCrafted.setHoverName("Absolute Demon seal")
    }
})

PlayerEvents.tick(playerTickEV => {
    let player = playerTickEV.player
    let mainHand = player.getEquipment("mainhand")
    let mainHandItemName = mainHand.item.id
    let offHand = player.getEquipment("offhand")
    let offHandItemName = offHand.item.id

    if (mainHandItemName.includes("spawn_egg")) {
        if (mainHandItemName.includes("aerialhell") ||
            mainHandItemName.includes("blue_skies")) {
            let dimension = playerTickEV.level.dimension.toString()

            if (!dimension.includes("aerialhell") &&
                !dimension.includes("blue_skies")) {
                mainHand.setCount(0)
            }
        }
    } else if (mainHandItemName.includes("wom:")) {
        let mainHandItemHoverName = mainHand.hoverName.string

        if (mainHandItemHoverName == "Agony" ||
            mainHandItemHoverName == "Torment" ||
            mainHandItemHoverName == "Ruine" ||
            mainHandItemHoverName == "Ender blaster" ||
            mainHandItemHoverName == "Satsujin" ||
            mainHandItemHoverName == "Herrscher" ||
            mainHandItemHoverName == "Gesetz" ||
            mainHandItemHoverName == "Moonless" ||
            mainHandItemHoverName == "Solar" ||
            mainHandItemHoverName == "Demon seal") {
                mainHand.setCount(0)
        }
    }

    if (offHandItemName.includes("wom:")) {
        let offHandItemHoveName = offHand.hoverName.string

        if (offHandItemHoveName == "Agony" ||
            offHandItemHoveName == "Torment" ||
            offHandItemHoveName == "Ruine" ||
            offHandItemHoveName == "Ender blaster" ||
            offHandItemHoveName == "Satsujin" ||
            offHandItemHoveName == "Herrscher" ||
            offHandItemHoveName == "Gesetz" ||
            offHandItemHoveName == "Moonless" ||
            offHandItemHoveName == "Solar" ||
            offHandItemHoveName == "Demon seal") {
                offHand.setCount(0)
        }
    }

    let playerEffect = player.potionEffects

    if ((mainHandItemName == "wom:gesetz") ||
        (mainHandItemName == "cataclysm:bulwark_of_the_flame") ||
        (mainHandItemName.toString().includes("slu:") &&
         mainHandItemName.toString().includes("shield"))) {
        if (!playerEffect.isActive("minecraft:resistance")) {
            playerEffect.add("minecraft:resistance", 20, 2)
        }

        if (!playerEffect.isActive("minecraft:slowness")) {
            playerEffect.add("minecraft:slowness", 20, 2)
        }
    }

    if ((offHandItemName == "wom:gesetz") ||
        (mainHandItemName == "cataclysm:bulwark_of_the_flame") ||
        (offHandItemName.toString().includes("slu:") &&
         offHandItemName.toString().includes("shield"))) {
        if (!playerEffect.isActive("minecraft:regeneration")) {
            playerEffect.add("minecraft:regeneration", 20, 2)
        }
    }
})

ServerEvents.recipes(recipesEvent => {
    recipesEvent.remove("cataclysm:ancient_spear")
    recipesEvent.remove("cataclysm:the_incinerator")
    recipesEvent.remove("cataclysm:meat_shredder")
    recipesEvent.remove("cataclysm:laser_gatling")
    recipesEvent.remove("cataclysm:bulwark_of_the_flame")
    recipesEvent.remove("cataclysm:wither_assault_shoulder_weapon")
    recipesEvent.remove("cataclysm:cursed_bow")
    recipesEvent.remove("cataclysm:soul_render")
    recipesEvent.remove("cataclysm:the_annihilator")
    recipesEvent.remove("cataclysm:ancient_spear")
    recipesEvent.remove("memory_of_the_past:tome_of_rebirth")
    recipesEvent.remove("memory_of_the_past:experience_enhancer_artifact")
    recipesEvent.remove("wom:solar")

    recipesEvent.shaped("kubejs:infernal_skull", [
        ' A ',
        'B C',
        ' D '
    ], {
        A: 'aerialhell:mud_cycle_mage_trophy',
        B: 'aerialhell:lunar_priest_trophy',
        C: 'aerialhell:lilith_trophy',
        D: 'aerialhell:chained_god_trophy'
    })

    recipesEvent.shaped("kubejs:toxin_cloud", [
        ' A ',
        'B C',
        ' D '
    ], {
        A: 'kubejs:stellaris',
        B: 'kubejs:summoner_champion',
        C: 'kubejs:spider_artifact',
        D: 'kubejs:alchemist_bottle'
    })


    recipesEvent.shaped("cataclysm:gauntlet_of_guard", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:monstrous_horn',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:infernal_skull',
        E: 'slu:grand_trial_sword',
        F: 'kubejs:void_diamond_heart'
    })

    recipesEvent.shaped("cataclysm:infernal_forge", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:monstrous_horn',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:toxin_cloud',
        E: 'slu:grand_trial_sword',
        F: 'kubejs:void_diamond_heart'
    })

    recipesEvent.shaped("cataclysm:meat_shredder", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:ancient_metal_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:infernal_skull',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:sandstorm_in_a_bottle'
    })

    recipesEvent.shaped("cataclysm:laser_gatling", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:witherite_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:infernal_skull',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:witherite_block'
    })

    recipesEvent.shaped("cataclysm:wither_assault_shoulder_weapon", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:witherite_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:toxin_cloud',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:witherite_block'
    })

    recipesEvent.shaped("cataclysm:tidal_claws", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:black_steel_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:infernal_skull',
        E: 'slu:grand_trial_sword',
        F: 'kubejs:abyssal_eye'
    })

    recipesEvent.shaped("cataclysm:the_incinerator", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:black_steel_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:toxin_cloud',
        E: 'slu:grand_trial_sword',
        F: 'kubejs:abyssal_eye'
    })

    recipesEvent.shaped("cataclysm:bulwark_of_the_flame", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:ignitium_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:infernal_skull',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:ignitium_block'
    })

    recipesEvent.shaped("cataclysm:soul_render", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:ignitium_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:toxin_cloud',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:ignitium_block'
    })

    recipesEvent.shaped("cataclysm:cursed_bow", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:cursium_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:toxin_cloud',
        E: 'slu:grand_trial_sword',
        F: 'kubejs:cursium_block'
    })

    recipesEvent.shaped("cataclysm:the_annihilator", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:cursium_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:infernal_skull',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:cursium_block'
    })

    recipesEvent.shaped("cataclysm:ancient_spear", [
        'ADA',
        'BEB',
        'CFC'
    ], {
        A: 'cataclysm:ancient_metal_ingot',
        B: 'kubejs:dragon_special',
        C: 'kubejs:absolute_smithing_template',
        D: 'kubejs:toxin_cloud',
        E: 'slu:grand_trial_sword',
        F: 'cataclysm:sandstorm_in_a_bottle'
    })

    recipesEvent.shaped("graveyard:black_bone_staff", [
        'ADA',
        'BFB',
        'CEC'
    ], {
        A: 'bosses_of_mass_destruction:void_thorn',
        B: 'kubejs:bone_soul',
        C: 'bosses_of_mass_destruction:ancient_anima',
        D: 'graveyard:vial_of_blood',
        E: 'graveyard:bone_dagger',
        F: 'minecraft:black_wool'
    })

    recipesEvent.shaped("graveyard:red_bone_staff", [
        'ADA',
        'BFB',
        'CEC'
    ], {
        A: 'bosses_of_mass_destruction:void_thorn',
        B: 'kubejs:bone_soul',
        C: 'bosses_of_mass_destruction:ancient_anima',
        D: 'graveyard:vial_of_blood',
        E: 'graveyard:bone_dagger',
        F: 'minecraft:red_wool'
    })

    recipesEvent.shaped("graveyard:cyan_bone_staff", [
        'ADA',
        'BFB',
        'CEC'
    ], {
        A: 'bosses_of_mass_destruction:void_thorn',
        B: 'kubejs:bone_soul',
        C: 'bosses_of_mass_destruction:ancient_anima',
        D: 'graveyard:vial_of_blood',
        E: 'graveyard:bone_dagger',
        F: 'minecraft:cyan_wool'
    })

    recipesEvent.shaped("graveyard:white_bone_staff", [
        'ADA',
        'BFB',
        'CEC'
    ], {
        A: 'bosses_of_mass_destruction:void_thorn',
        B: 'kubejs:bone_soul',
        C: 'bosses_of_mass_destruction:ancient_anima',
        D: 'graveyard:vial_of_blood',
        E: 'graveyard:bone_dagger',
        F: 'minecraft:white_wool'
    })
    recipesEvent.shaped("graveyard:purple_bone_staff", [
        'ADA',
        'BFB',
        'CEC'
    ], {
        A: 'bosses_of_mass_destruction:void_thorn',
        B: 'kubejs:bone_soul',
        C: 'bosses_of_mass_destruction:ancient_anima',
        D: 'graveyard:vial_of_blood',
        E: 'graveyard:bone_dagger',
        F: 'minecraft:purple_wool'
    })

    recipesEvent.shaped("kubejs:dragon_special", [
        'AAA',
        'AAA',
        'AAA'
    ], {
        A: 'minecraft:dragon_breath'
    })

    recipesEvent.shaped("wom:agony", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:ancient_spear',
        B: 'bosses_of_mass_destruction:void_thorn',
        C: 'cataclysm:the_immolator'
    })

    recipesEvent.shaped("wom:tormented_mind", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:meat_shredder',
        B: 'bosses_of_mass_destruction:ancient_anima',
        C: 'cataclysm:soul_render'
    })

    recipesEvent.shaped("wom:ruine", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:the_incinerator',
        B: 'bosses_of_mass_destruction:void_thorn',
        C: 'cataclysm:ancient_spear'
    })

    recipesEvent.shaped("wom:ender_blaster", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:laser_gatling',
        B: 'bosses_of_mass_destruction:ancient_anima',
        C: 'cataclysm:void_assault_shoulder_weapon'
    })

    recipesEvent.shaped("wom:moonless", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:gauntlet_of_maelstrom',
        B: 'bosses_of_mass_destruction:void_thorn',
        C: 'cataclysm:wrath_of_the_desert'
    })

    recipesEvent.shaped("wom:satsujin", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:the_incinerator',
        B: 'bosses_of_mass_destruction:ancient_anima',
        C: 'cataclysm:soul_render'
    })

    recipesEvent.shaped("wom:herrscher", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:the_immolator',
        B: 'bosses_of_mass_destruction:void_thorn',
        C: 'cataclysm:infernal_forge'
    })

    recipesEvent.shaped("wom:gesetz", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:bulwark_of_the_flame',
        B: 'bosses_of_mass_destruction:ancient_anima',
        C: 'cataclysm:tidal_claws'
    })

    recipesEvent.shaped("wom:solar", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:void_assault_shoulder_weapon',
        B: 'bosses_of_mass_destruction:void_thorn',
        C: 'cataclysm:wrath_of_the_desert'
    })

    recipesEvent.shaped("wom:demon_seal", [
        '   ',
        'ABC',
        '   '
    ], {
        A: 'cataclysm:meat_shredder',
        B: 'bosses_of_mass_destruction:ancient_anima',
        C: 'cataclysm:tidal_claws'
    })
})
